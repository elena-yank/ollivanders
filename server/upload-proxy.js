// upload-proxy.js — серверный прокси для загрузки изображений в VK
//
// Проблема: VK upload серверы (pu.vk.com) не отправляют CORS-заголовки,
// поэтому браузер не может загружать файлы напрямую (ни XHR, ни fetch, ни iframe).
//
// Решение: этот прокси-сервер принимает изображение от клиента (в формате base64
// в JSON), загружает его на сервер ВК (сервер-сервер, без CORS) и возвращает
// результат с attachment строкой.
//
// Запуск:
//   node server/upload-proxy.js
//
// Требуется Node.js 18+ (из-за fetch и FormData)
//
// Продакшен: запускать через PM2:
//   pm2 start server/upload-proxy.js --name wand-upload-proxy

import http from "node:http";

const PORT = process.env.UPLOAD_PROXY_PORT || 3001;
const VK_API_VERSION = "5.199";
const VK_ACCESS_TOKEN = process.env.VK_ACCESS_TOKEN;
const VK_GROUP_ID = process.env.VK_GROUP_ID;

if (!VK_ACCESS_TOKEN) {
  console.error("[upload-proxy] ERROR: VK_ACCESS_TOKEN environment variable is required");
  process.exit(1);
}

if (!VK_GROUP_ID) {
  console.error("[upload-proxy] ERROR: VK_GROUP_ID environment variable is required");
  process.exit(1);
}

/**
 * Вызов VK API (сервер-сервер, без CORS)
 */
async function callVkApi(method, params = {}) {
  const queryParams = new URLSearchParams({
    ...params,
    access_token: VK_ACCESS_TOKEN,
    v: VK_API_VERSION,
  });

  const url = `https://api.vk.com/method/${method}?${queryParams}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    throw new Error(`VK API Error [${method}]: ${data.error.error_msg}`);
  }

  return data.response;
}

/**
 * Загружает файл на VK upload сервер (сервер-сервер, без CORS)
 * Использует нативный FormData (Node.js 18+)
 */
async function uploadToVKServer(uploadUrl, imageBuffer, filename = "result.png") {
  const formData = new FormData();
  const blob = new Blob([imageBuffer], { type: "image/png" });
  formData.append("photo", blob, filename);

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  const text = await response.text();
  return JSON.parse(text);
}

// Создаём HTTP сервер
const server = http.createServer(async (req, res) => {
  // CORS заголовки для браузера
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    // Собираем тело запроса
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString());

    // Проверяем наличие изображения
    if (!body.image || typeof body.image !== "string") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing 'image' field (base64 string)" }));
      return;
    }

    // Декодируем base64 в Buffer
    const base64Data = body.image.includes(",")
      ? body.image.split(",")[1] // support data:image/png;base64,...
      : body.image;

    const imageBuffer = Buffer.from(base64Data, "base64");

    if (imageBuffer.length === 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Empty image data" }));
      return;
    }

    console.log(`[upload-proxy] Received image: ${imageBuffer.length} bytes`);

    // Получаем upload URL от VK API
    console.log("[upload-proxy] Getting upload server...");
    const uploadServer = await callVkApi("photos.getMessagesUploadServer", {
      group_id: VK_GROUP_ID,
    });
    console.log("[upload-proxy] Upload URL obtained");

    // Загружаем изображение на сервер ВК
    console.log("[upload-proxy] Uploading to VK server...");
    const uploadResult = await uploadToVKServer(uploadServer.upload_url, imageBuffer);
    console.log("[upload-proxy] Upload result received");

    if (uploadResult.error) {
      throw new Error(`VK upload error: ${uploadResult.error}`);
    }

    // Сохраняем фото
    console.log("[upload-proxy] Saving photo...");
    const savedPhotos = await callVkApi("photos.saveMessagesPhoto", {
      group_id: VK_GROUP_ID,
      photo: uploadResult.photo,
      server: uploadResult.server,
      hash: uploadResult.hash,
    });

    // Формируем результат
    const photo = Array.isArray(savedPhotos) ? savedPhotos[0] : savedPhotos;
    const attachment = `photo${photo.owner_id}_${photo.id}`;

    console.log(`[upload-proxy] Success! Attachment: ${attachment}`);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, photo, attachment }));
  } catch (error) {
    console.error("[upload-proxy] Error:", error.message);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`[upload-proxy] Server running on http://localhost:${PORT}`);
  console.log(`[upload-proxy] Group ID: ${VK_GROUP_ID}`);
});