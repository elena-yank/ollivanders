// vk-api.js — работа с VK API: загрузка изображений, отправка сообщений
//
// Для загрузки изображений используется серверный прокси (/api/upload),
// так как VK upload серверы не поддерживают CORS.
//
// Для отправки сообщений используется VK Bridge (VKWebAppCallAPIMethod),
// который идёт через нативный клиент ВК и не имеет CORS-проблем.
// Если VK Bridge недоступен — fallback на JSONP.
import { VK_CONFIG } from "./vk-config.js";

/**
 * Вызов VK API метода через VK Bridge или JSONP
 */
function callVkApi(method, params = {}) {
  // VK Bridge — нет CORS, работает внутри приложения ВК
  if (typeof vkBridge !== "undefined") {
    return vkBridge
      .send("VKWebAppCallAPIMethod", {
        method: method,
        params: {
          ...params,
          access_token: VK_CONFIG.accessToken,
          v: VK_CONFIG.apiVersion,
        },
      })
      .then((response) => {
        if (response.response) return response.response;
        if (response.error) throw new Error(`VK API Error [${method}]: ${response.error.error_msg}`);
        return response;
      })
      .catch((bridgeError) => {
        const errorMsg =
          bridgeError?.error_data?.message ||
          bridgeError?.error_msg ||
          bridgeError?.message ||
          (typeof bridgeError === "string" ? bridgeError : JSON.stringify(bridgeError));
        throw new Error(`VK API Error [${method}]: ${errorMsg}`);
      });
  }

  // Fallback: JSONP (для разработки вне ВК)
  return new Promise((resolve, reject) => {
    const callbackName = `vk_callback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const queryParams = new URLSearchParams({
      ...params,
      access_token: VK_CONFIG.accessToken,
      v: VK_CONFIG.apiVersion,
      callback: callbackName,
    });
    const url = `https://api.vk.com/method/${method}?${queryParams}`;

    window[callbackName] = (response) => {
      delete window[callbackName];
      document.head.removeChild(script);
      if (response.error) {
        reject(new Error(`VK API Error [${method}]: ${response.error.error_msg}`));
      } else {
        resolve(response.response);
      }
    };

    const script = document.createElement("script");
    script.src = url;
    script.onerror = () => {
      delete window[callbackName];
      document.head.removeChild(script);
      reject(new Error(`VK API Network Error [${method}]`));
    };
    document.head.appendChild(script);
  });
}

/**
 * Конвертирует Blob в base64 (data URI)
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });
}

/**
 * Загружает изображение в ВК через серверный прокси
 *
 * VK upload серверы не поддерживают CORS, поэтому браузер не может
 * загружать файлы напрямую. Прокси (server/upload-proxy.js) принимает
 * base64, загружает файл на VK сервер-сервер и возвращает attachment.
 */
export async function uploadAndGetAttachment(imageBlob) {
  const base64 = await blobToBase64(imageBlob);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64 }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `Upload proxy error (${response.status}): ${errorData?.error || response.statusText}`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Upload proxy error: ${result.error}`);
  }

  return { photo: result.photo, attachment: result.attachment };
}

/**
 * Отправляет личное сообщение пользователю от имени группы
 */
export async function sendMessageToUser(userId, message, attachment = null) {
  const params = {
    user_id: userId,
    message: message,
    random_id: Date.now(),
  };

  if (attachment) {
    params.attachment = attachment;
  }

  return callVkApi("messages.send", params);
}