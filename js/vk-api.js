// vk-api.js — работа с VK API: загрузка изображений, отправка сообщений
//
// В VK Mini App все VK API вызовы идут через VK Bridge (VKWebAppCallAPIMethod).
// VK Bridge отправляет запросы через нативный клиент ВК, поэтому CORS-проблем нет.
//
// Для загрузки изображений используется VK API метод photos.saveMessagesPhoto
// с передачей фото в base64 (VK API поддерживает этот формат).
import { VK_CONFIG } from "./vk-config.js";

/**
 * Вызов VK API метода через VK Bridge
 *
 * VK Bridge (VKWebAppCallAPIMethod) отправляет запрос через нативный клиент ВК,
 * что полностью решает проблему CORS — как для обычных API вызовов, так и для
 * загрузки изображений.
 *
 * Если VK Bridge недоступен (приложение запущено вне ВК), используем JSONP.
 */
function callVkApi(method, params = {}) {
  // Если VK Bridge доступен — используем его (нет CORS)
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
        if (response.response) {
          return response.response;
        }
        if (response.error) {
          throw new Error(`VK API Error [${method}]: ${response.error.error_msg}`);
        }
        return response;
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
 * Конвертирует Blob в base64 строку (без префикса data:image/...)
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Убираем префикс data:image/png;base64,
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read blob as base64"));
    reader.readAsDataURL(blob);
  });
}

/**
 * Загружает изображение в ВК и возвращает attachment
 *
 * Стратегия (2 попытки):
 * 1. VK Bridge → photos.saveMessagesPhoto с base64 (работает внутри ВК, нет CORS)
 * 2. VK API JSONP → photos.saveMessagesPhoto с base64 (fallback для разработки вне ВК)
 */
export async function uploadAndGetAttachment(imageBlob) {
  // Конвертируем Blob в base64
  const base64 = await blobToBase64(imageBlob);

  // Загружаем фото через VK API метод photos.saveMessagesPhoto
  // VK API принимает фото в формате base64
  const savedPhotos = await callVkApi("photos.saveMessagesPhoto", {
    group_id: VK_CONFIG.groupId,
    photo: base64,
  });

  const photo = Array.isArray(savedPhotos) ? savedPhotos[0] : savedPhotos;

  if (!photo || (!photo.id && !photo.photo_hash)) {
    throw new Error("Invalid photo response from VK API");
  }

  // Формируем attachment
  let attachment;
  if (photo.id && photo.owner_id) {
    attachment = `photo${photo.owner_id}_${photo.id}`;
  } else if (photo.photo_hash) {
    attachment = `photo-${VK_CONFIG.groupId}_${photo.photo_hash}`;
  } else {
    throw new Error("Unknown photo format");
  }

  return { photo, attachment };
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