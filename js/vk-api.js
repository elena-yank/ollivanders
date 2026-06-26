// vk-api.js — работа с VK API: загрузка изображений, создание постов, отправка сообщений
// Использует JSONP для обхода CORS (VK API поддерживает callback)
// Для загрузки изображений использует серверный прокси (nginx → Node.js),
// так как VK upload серверы не поддерживают CORS
import { VK_CONFIG } from "./vk-config.js";

/**
 * Вызов VK API метод через JSONP
 */
function callVkApi(method, params = {}) {
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
 * Загружает изображение в VK через серверный прокси
 *
 * VK upload серверы (pu.vk.com) не отправляют CORS-заголовки,
 * поэтому браузер не может загружать файлы напрямую (ни XHR, ни fetch, ни iframe).
 *
 * Решение: отправляем изображение на свой сервер (base64 в JSON),
 * который загружает его в VK (сервер-сервер, без CORS) и возвращает attachment.
 *
 * Прокси-эндпоинт: POST /api/upload
 * Тело: { image: "data:image/png;base64,..." }
 * Ответ: { success: true, photo: {...}, attachment: "photo123_456" }
 */
async function uploadViaProxy(imageBlob) {
  // Конвертируем Blob в base64
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

  return result;
}

/**
 * Конвертирует Blob в base64 строку (data URI)
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read blob as base64"));
    reader.readAsDataURL(blob);
  });
}

/**
 * Полный процесс: загрузка изображения на сервер ВК → возврат attachment
 * Использует серверный прокси для обхода CORS
 */
export async function uploadAndGetAttachment(imageBlob) {
  const result = await uploadViaProxy(imageBlob);
  return { photo: result.photo, attachment: result.attachment };
}

/**
 * Отправляет личное сообщение пользователю от имени группы
 * @param {number} userId — ID пользователя ВК
 * @param {string} message — текст сообщения
 * @param {string|null} attachment — attachment (например, photo123_456) для прикрепления
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