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
 * Загружает Blob на VK upload URL через XMLHttpRequest
 *
 * VK upload серверы не отправляют CORS-заголовки, поэтому fetch() не работает.
 * XMLHttpRequest с FormData — единственный надёжный способ загрузки файлов
 * в VK API из браузера. XHR может выполнить запрос (simple request),
 * но прочитать ответ не сможет из-за отсутствия CORS.
 *
 * Решение: используем XHR с таймаутом и парсим responseText как JSON.
 * Если CORS блокирует чтение ответа — пробуем JSONP-подход через <script>,
 * где VK upload сервер возвращает JSON в теле, обёрнутый в callback.
 */
function uploadViaXHR(url, formData) {
  return new Promise((resolve, reject) => {
    // Пробуем XHR
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.responseType = "text";

    let timer = setTimeout(() => {
      xhr.abort();
      reject(new Error("Upload timeout"));
    }, 30000);

    xhr.onload = function () {
      clearTimeout(timer);
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          resolve(result);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.responseText}`));
        }
      } catch (e) {
        reject(new Error("Failed to parse upload response: " + e.message));
      }
    };

    xhr.onerror = function () {
      clearTimeout(timer);
      // XHR может упасть с ошибкой из-за CORS, но запрос может быть выполнен.
      // Пробуем альтернативный метод — JSONP через <script> тег.
      reject(new Error("XHR upload failed (CORS?), trying fallback"));
    };

    xhr.onabort = function () {
      clearTimeout(timer);
      reject(new Error("Upload aborted"));
    };

    xhr.send(formData);
  });
}

/**
 * Альтернативный метод загрузки через JSONP (если XHR не сработал из-за CORS)
 * VK upload сервер может вернуть JSON, который мы загружаем через <script> тег
 * с callback-параметром.
 */
function uploadViaJSONP(url, formData) {
  return new Promise((resolve, reject) => {
    // Создаём скрытый iframe для отправки формы
    const iframeId = `vk_upload_iframe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const iframe = document.createElement("iframe");
    iframe.id = iframeId;
    iframe.name = iframeId;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.enctype = "multipart/form-data";
    form.target = iframeId;
    form.style.display = "none";

    for (const [key, value] of formData.entries()) {
      if (value instanceof Blob || value instanceof File) {
        const input = document.createElement("input");
        input.type = "file";
        input.name = key;
        input.style.display = "none";

        const file = new File([value], "result.png", { type: "image/png" });
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;

        form.appendChild(input);
      } else {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);

    let timer = setTimeout(() => {
      cleanup();
      reject(new Error("Upload timeout"));
    }, 30000);

    function cleanup() {
      clearTimeout(timer);
      try {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      } catch (e) {
        // Игнорируем ошибки удаления
      }
    }

    // Пытаемся читать содержимое iframe с задержкой,
    // чтобы дать браузеру время загрузить ответ
    let attempts = 0;
    const maxAttempts = 20;

    function tryParseIframe() {
      attempts++;
      try {
        // Пробуем получить содержимое iframe
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc && doc.body) {
          const text = doc.body.textContent || doc.body.innerText || "";
          if (text && text.trim()) {
            try {
              const result = JSON.parse(text.trim());
              cleanup();
              resolve(result);
              return;
            } catch (parseError) {
              // Текст есть, но не JSON — возможно, ответ ещё не полностью загружен
            }
          }
        }
      } catch (e) {
        // Cross-origin ошибка — contentDocument недоступен
        // Это ожидаемо для VK upload серверов
      }

      if (attempts < maxAttempts) {
        setTimeout(tryParseIframe, 200);
      } else {
        cleanup();
        reject(new Error("Failed to read upload response after " + (maxAttempts * 200) + "ms"));
      }
    }

    // Начинаем проверять iframe после отправки
    iframe.onload = function () {
      // Даём небольшую задержку перед первой попыткой
      setTimeout(tryParseIframe, 500);
    };

    form.submit();
  });
}

/**
 * Загружает изображение на сервер ВК через upload URL
 *
 * Стратегия загрузки (2 попытки):
 * 1. XMLHttpRequest с FormData — работает для VK upload серверов (simple request)
 * 2. JSONP через iframe — fallback, если XHR заблокирован CORS
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

  // Загружаем изображение на сервер ВК
  const formData = new FormData();
  formData.append("photo", imageBlob, "result.png");

  // Пробуем XHR в первую очередь (он работает для VK upload серверов)
  let uploadResult;
  try {
    uploadResult = await uploadViaXHR(uploadServer.upload_url, formData);
  } catch (xhrError) {
    console.warn("[uploadPhotoToVK] XHR upload failed, trying JSONP fallback:", xhrError.message);
    // Если XHR не сработал (CORS), пробуем JSONP через iframe
    try {
      uploadResult = await uploadViaJSONP(uploadServer.upload_url, formData);
    } catch (jsonpError) {
      throw new Error(`Upload failed: XHR error (${xhrError.message}), JSONP error (${jsonpError.message})`);
    }
  }

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