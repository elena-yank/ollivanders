// vk-api.js — работа с VK API: загрузка изображений, отправка сообщений
//
// В VK Mini App VK API вызовы идут через VK Bridge (VKWebAppCallAPIMethod),
// который отправляет запросы через нативный клиент ВК (нет CORS).
//
// Загрузка фото:
//   1. photos.getMessagesUploadServer → получаем upload_url
//   2. Загружаем файл на upload_url через XMLHttpRequest (no-cors)
//   3. Читаем ответ через JSONP (VK upload сервер поддерживает callback)
//   4. photos.saveMessagesPhoto → сохраняем фото
import { VK_CONFIG } from "./vk-config.js";

/**
 * Вызов VK API метода
 *
 * Приоритет:
 *   1. VK Bridge (VKWebAppCallAPIMethod) — работает внутри ВК, нет CORS
 *   2. JSONP — fallback для разработки вне ВК
 */
function callVkApi(method, params = {}) {
  // VK Bridge доступен — используем его
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
 * Загружает Blob на VK upload URL через XMLHttpRequest
 *
 * VK upload серверы не поддерживают CORS, поэтому:
 * - XHR с FormData отправляет файл (simple request)
 * - onerror срабатывает из-за CORS, но файл может быть загружен
 * - Используем JSONP для получения ответа
 */
function uploadViaFormData(url, formData) {
  return new Promise((resolve, reject) => {
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
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      } catch (e) {
        reject(new Error("Failed to parse upload response: " + e.message));
      }
    };

    xhr.onerror = function () {
      clearTimeout(timer);
      // XHR упал из-за CORS, но запрос мог выполниться.
      // Пробуем прочитать ответ через JSONP
      reject(new Error("CORS error"));
    };

    xhr.onabort = function () {
      clearTimeout(timer);
      reject(new Error("Upload aborted"));
    };

    xhr.send(formData);
  });
}

/**
 * Загружает изображение на VK upload URL через iframe + JSONP
 *
 * VK upload серверы поддерживают callback-параметр.
 * Если добавить ?callback=xxx к upload URL, сервер вернёт
 * JSONP-ответ: callback({server:..., photo:..., hash:...})
 *
 * Мы отправляем форму через iframe, а ответ читаем через
 * JSONP-скрипт, который не имеет CORS-ограничений.
 */
function uploadViaJSONP(uploadUrl, formData) {
  return new Promise((resolve, reject) => {
    const callbackName = `vk_upload_cb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Добавляем callback к upload URL
    const separator = uploadUrl.includes("?") ? "&" : "?";
    const jsonpUrl = `${uploadUrl}${separator}callback=${callbackName}`;

    // Создаём скрытый iframe для отправки формы
    const iframeId = `vk_upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const iframe = document.createElement("iframe");
    iframe.id = iframeId;
    iframe.name = iframeId;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = jsonpUrl;
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
      delete window[callbackName];
      try {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      } catch (e) {}
    }

    // Устанавливаем JSONP callback
    window[callbackName] = (result) => {
      cleanup();
      if (result.error) {
        reject(new Error(`Upload error: ${result.error}`));
      } else {
        resolve(result);
      }
    };

    // Отправляем форму
    form.submit();
  });
}

/**
 * Загружает изображение в ВК
 *
 * Стратегия:
 *   1. Получаем upload URL через VK Bridge (photos.getMessagesUploadServer)
 *   2. Пробуем XHR с FormData (может сработать для некоторых upload серверов)
 *   3. Если XHR упал с CORS — используем JSONP через iframe
 *   4. Сохраняем фото через VK Bridge (photos.saveMessagesPhoto)
 */
export async function uploadAndGetAttachment(imageBlob) {
  // 1. Получаем upload server
  const uploadServer = await callVkApi("photos.getMessagesUploadServer", {
    group_id: VK_CONFIG.groupId,
  });

  if (!uploadServer || !uploadServer.upload_url) {
    throw new Error("Failed to get upload URL");
  }

  // 2. Загружаем файл
  const formData = new FormData();
  formData.append("photo", imageBlob, "result.png");

  let uploadResult;
  try {
    // Попытка 1: XHR (может сработать для некоторых серверов)
    uploadResult = await uploadViaFormData(uploadServer.upload_url, formData);
  } catch (xhrError) {
    console.warn("[upload] XHR failed, trying JSONP:", xhrError.message);
    // Попытка 2: JSONP через iframe (VK upload сервер поддерживает callback)
    uploadResult = await uploadViaJSONP(uploadServer.upload_url, formData);
  }

  if (!uploadResult || uploadResult.error) {
    throw new Error(`Upload error: ${uploadResult?.error || "unknown"}`);
  }

  // 3. Сохраняем фото
  const savedPhotos = await callVkApi("photos.saveMessagesPhoto", {
    group_id: VK_CONFIG.groupId,
    photo: uploadResult.photo,
    server: uploadResult.server,
    hash: uploadResult.hash,
  });

  const photo = Array.isArray(savedPhotos) ? savedPhotos[0] : savedPhotos;

  if (!photo) {
    throw new Error("Failed to save photo");
  }

  // 4. Формируем attachment
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