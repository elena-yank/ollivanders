// vk-api.js — работа с VK API: загрузка изображений, отправка сообщений
//
// VK API вызовы идут через VK Bridge (VKWebAppCallAPIMethod) — он работает
// через нативный клиент ВК и не имеет CORS-проблем.
// Если VK Bridge недоступен — fallback на JSONP.
//
// Загрузка изображений: получаем upload URL через VK Bridge, загружаем файл
// через XHR с FormData. Если CORS блокирует — фото не прикрепится, но
// сообщение отправится без attachment.
import { VK_CONFIG } from "./vk-config.js";

/**
 * Вызов VK API метода через VK Bridge или JSONP
 */
function callVkApi(method, params = {}) {
  if (typeof vkBridge !== "undefined") {
    // Проверяем, есть ли параметры запуска VK (без них VK Bridge не работает)
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("vk_app_id")) {
      console.warn(`VK Bridge доступен, но нет параметров запуска VK — пропускаем API вызов ${method}`);
      return Promise.reject(new Error("VK Bridge не инициализирован (нет параметров запуска)"));
    }

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
        // Если ошибка связана с инициализацией — не паникуем, просто сообщаем
        const errorMsg =
          bridgeError?.error_data?.message ||
          bridgeError?.error_msg ||
          bridgeError?.message ||
          (typeof bridgeError === "string" ? bridgeError : JSON.stringify(bridgeError));
        
        // Проверяем, не связана ли ошибка с отсутствием инициализации
        if (errorMsg.includes("currentAppId") || errorMsg.includes("undefined")) {
          console.warn(`VK Bridge: метод ${method} недоступен (bridge не инициализирован)`);
        }
        
        throw new Error(`VK API Error [${method}]: ${errorMsg}`);
      });
  }

  // Fallback: JSONP
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
 * Загружает изображение в ВК
 *
 * 1. Получаем upload URL через VK Bridge
 * 2. Загружаем файл через XHR (может не сработать из-за CORS)
 * 3. Сохраняем фото
 */
export async function uploadAndGetAttachment(imageBlob) {
  // 1. Получаем upload server
  const uploadServer = await callVkApi("photos.getMessagesUploadServer", {
    group_id: VK_CONFIG.groupId,
  });

  // 2. Загружаем файл через XHR
  const formData = new FormData();
  formData.append("photo", imageBlob, "result.png");

  const uploadResult = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploadServer.upload_url, true);
    xhr.responseType = "text";

    const timer = setTimeout(() => {
      xhr.abort();
      reject(new Error("Upload timeout"));
    }, 30000);

    xhr.onload = function () {
      clearTimeout(timer);
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      } catch (e) {
        reject(new Error("Failed to parse upload response: " + e.message));
      }
    };

    xhr.onerror = function () {
      clearTimeout(timer);
      reject(new Error("XHR upload failed (CORS)"));
    };

    xhr.send(formData);
  });

  if (uploadResult.error) {
    throw new Error(`VK upload error: ${uploadResult.error}`);
  }

  // 3. Сохраняем фото
  const savedPhotos = await callVkApi("photos.saveMessagesPhoto", {
    group_id: VK_CONFIG.groupId,
    photo: uploadResult.photo,
    server: uploadResult.server,
    hash: uploadResult.hash,
  });

  const photo = Array.isArray(savedPhotos) ? savedPhotos[0] : savedPhotos;
  const attachment = `photo${photo.owner_id}_${photo.id}`;

  return { photo, attachment };
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