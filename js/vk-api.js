// vk-api.js — работа с VK API: загрузка изображений, создание постов, отправка сообщений
// Использует JSONP для обхода CORS (VK API поддерживает callback)
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
 * Загружает Blob на VK upload URL через XMLHttpRequest (обходит CORS)
 * VK upload серверы не поддерживают CORS для fetch, но работают с XHR
 */
function uploadViaXHR(url, formData) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onload = function () {
      try {
        const result = JSON.parse(xhr.responseText);
        resolve(result);
      } catch (e) {
        reject(new Error("Failed to parse upload response"));
      }
    };
    xhr.onerror = function () {
      reject(new Error("XHR upload failed"));
    };
    xhr.send(formData);
  });
}

/**
 * Загружает изображение на сервер ВК через upload URL
 * Использует XMLHttpRequest для обхода CORS (VK upload серверы не поддерживают fetch)
 */
async function uploadPhotoToVK(imageBlob) {
  // Пробуем разные методы получения upload server
  let uploadServer = null;
  let saveMethod = null;
  let saveParams = {};

  // Попытка 1: photos.getWallUploadServer (для загрузки на стену группы)
  try {
    uploadServer = await callVkApi("photos.getWallUploadServer", {
      group_id: VK_CONFIG.groupId,
    });
    saveMethod = "photos.saveWallPhoto";
    saveParams = { group_id: VK_CONFIG.groupId };
  } catch (e) {
    // Попытка 2: photos.getMessagesUploadServer (для загрузки в сообщения)
    try {
      uploadServer = await callVkApi("photos.getMessagesUploadServer", {
        group_id: VK_CONFIG.groupId,
      });
      saveMethod = "photos.saveMessagesPhoto";
      saveParams = { group_id: VK_CONFIG.groupId };
    } catch (e2) {
      // Попытка 3: photos.getOwnerPhotoUploadServer
      try {
        uploadServer = await callVkApi("photos.getOwnerPhotoUploadServer", {
          owner_id: `-${VK_CONFIG.groupId}`,
        });
        saveMethod = "photos.saveOwnerPhoto";
        saveParams = {};
      } catch (e3) {
        throw new Error("All photo upload methods failed. Token may not have photos permission.");
      }
    }
  }

  // Загружаем изображение на сервер ВК через XHR (обходит CORS)
  const formData = new FormData();
  formData.append("photo", imageBlob, "result.png");

  const uploadResult = await uploadViaXHR(uploadServer.upload_url, formData);

  if (uploadResult.error) {
    throw new Error(`Upload error: ${uploadResult.error}`);
  }

  // Сохраняем фото
  const savedPhotos = await callVkApi(saveMethod, {
    ...saveParams,
    photo: uploadResult.photo,
    server: uploadResult.server,
    hash: uploadResult.hash,
  });

  // photos.saveOwnerPhoto возвращает объект { photo_hash, photo_src }
  // photos.saveWallPhoto возвращает массив фото
  // photos.saveMessagesPhoto возвращает массив фото
  if (Array.isArray(savedPhotos)) {
    return savedPhotos[0];
  } else {
    // Для saveOwnerPhoto — возвращаем как есть
    return savedPhotos;
  }
}

/**
 * Формирует строку attachment для фото
 */
function getPhotoAttachment(photo) {
  if (photo.id && photo.owner_id) {
    // Стандартный формат: photo{owner_id}_{id}
    return `photo${photo.owner_id}_${photo.id}`;
  } else if (photo.photo_hash) {
    // Для saveOwnerPhoto — другой формат
    return `photo-${VK_CONFIG.groupId}_${photo.photo_hash}`;
  } else {
    throw new Error("Unknown photo format");
  }
}

/**
 * Полный процесс: загрузка изображения на сервер ВК → возврат attachment
 */
export async function uploadAndGetAttachment(imageBlob) {
  // 1. Загружаем изображение на сервер ВК
  const photo = await uploadPhotoToVK(imageBlob);

  // 2. Формируем attachment строку
  const attachment = getPhotoAttachment(photo);

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