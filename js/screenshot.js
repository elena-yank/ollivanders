// screenshot.js — создание скриншота результата теста
// Рисует результат на Canvas вручную, используя фоновое изображение и данные результата
// Это надёжнее html2canvas, который может не захватить z-index и фоновые изображения

/**
 * Загружает изображение и возвращает HTMLImageElement
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Создаёт скриншот центральной части экрана результата,
 * попадающей в эллипс фонового изображения (без кнопки "Пройти заново").
 *
 * В отличие от html2canvas, этот подход:
 * - Не зависит от DOM-рендеринга
 * - Корректно работает с фоновыми изображениями
 * - Не имеет проблем с CORS/z-index
 *
 * @param {Object} result - объект результата { title, wood, core, length, flexibility, description }
 * @returns {Promise<Blob>} - Blob изображения в формате PNG
 */
export async function captureResultScreenshot(result) {
  console.log("[screenshot] Generating result image for:", result?.title);

  if (!result) {
    throw new Error("No result data provided");
  }

  // Размеры экрана (для расчёта пропорций эллипса)
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  // Размеры итогового изображения (2x для чёткости)
  const WIDTH = screenW * 2;
  const HEIGHT = screenH * 2;

  // Создаём canvas
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  // 1. Загружаем фоновое изображение
  let bgImg = null;
  try {
    bgImg = await loadImage("bg/result.jpg");
    console.log("[screenshot] Background image loaded:", bgImg.width, "x", bgImg.height);
  } catch (e) {
    console.warn("[screenshot] Failed to load background image, using dark background:", e);
  }

  // 2. Рисуем фон
  if (bgImg) {
    // Рисуем изображение на весь canvas с cover-эффектом
    const imgRatio = bgImg.width / bgImg.height;
    const canvasRatio = WIDTH / HEIGHT;

    let drawW, drawH, drawX, drawY;
    if (imgRatio > canvasRatio) {
      drawH = HEIGHT;
      drawW = HEIGHT * imgRatio;
      drawX = (WIDTH - drawW) / 2;
      drawY = 0;
    } else {
      drawW = WIDTH;
      drawH = WIDTH / imgRatio;
      drawX = 0;
      drawY = (HEIGHT - drawH) / 2;
    }

    ctx.drawImage(bgImg, drawX, drawY, drawW, drawH);
  } else {
    // Тёмный фон, если изображение не загрузилось
    const gradient = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 0, WIDTH / 2, HEIGHT / 2, WIDTH * 0.5);
    gradient.addColorStop(0, "#1a1530");
    gradient.addColorStop(1, "#0f0c1a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  // 3. Затемнение по краям (эллиптическая маска)
  // CSS: radial-gradient(ellipse 50% 60% at 50% 50%, transparent 30%, rgb(0, 0, 0) 70%)
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const ellipseRX = WIDTH * 0.25; // 50% / 2
  const ellipseRY = HEIGHT * 0.30; // 60% / 2

  // Создаём градиентное затемнение
  const gradientOverlay = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(ellipseRX, ellipseRY));
  gradientOverlay.addColorStop(0, "rgba(0,0,0,0)");
  gradientOverlay.addColorStop(0.3, "rgba(0,0,0,0)");
  gradientOverlay.addColorStop(0.7, "rgba(0,0,0,0.85)");
  gradientOverlay.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = gradientOverlay;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 4. Обрезаем по эллипсу — оставляем только центральную часть
  // Создаём новый canvas для результата
  const resultW = ellipseRX * 2;
  const resultH = ellipseRY * 2;
  const resultCanvas = document.createElement("canvas");
  resultCanvas.width = resultW;
  resultCanvas.height = resultH;
  const resultCtx = resultCanvas.getContext("2d");

  // Эллиптическая маска
  resultCtx.beginPath();
  resultCtx.ellipse(resultW / 2, resultH / 2, resultW / 2, resultH / 2, 0, 0, Math.PI * 2);
  resultCtx.closePath();
  resultCtx.clip();

  // Копируем центральную часть
  resultCtx.drawImage(
    canvas,
    centerX - ellipseRX,
    centerY - ellipseRY,
    resultW,
    resultH,
    0,
    0,
    resultW,
    resultH
  );

  // 5. Рисуем текст результата поверх фона (внутри эллипса)
  const textScale = resultW / 1200; // Масштабируем относительно эталонной ширины 1200px

  // Заголовок
  resultCtx.textAlign = "center";
  resultCtx.textBaseline = "middle";

  // Иконка
  const iconSize = Math.round(64 * textScale);
  resultCtx.font = `${iconSize}px serif`;
  resultCtx.fillText("🪄", resultW / 2, Math.round(resultH * 0.15));

  // Название палочки
  const titleSize = Math.round(36 * textScale);
  resultCtx.font = `bold ${titleSize}px 'Segoe UI', Arial, sans-serif`;
  resultCtx.fillStyle = "#b388ff";
  resultCtx.fillText(result.title, resultW / 2, Math.round(resultH * 0.30));

  // Характеристики
  const detailSize = Math.round(22 * textScale);
  const details = [
    { label: "Древесина", value: result.wood },
    { label: "Сердцевина", value: result.core },
    { label: "Длина", value: result.length },
    { label: "Упругость", value: result.flexibility },
  ];

  const cardY = Math.round(resultH * 0.38);
  const cardH = Math.round(details.length * 48 * textScale + 40 * textScale);
  const cardX = Math.round(resultW * 0.1);
  const cardW = Math.round(resultW * 0.8);

  // Фон карточки
  resultCtx.fillStyle = "rgba(13, 11, 21, 0.85)";
  resultCtx.strokeStyle = "#2d2650";
  resultCtx.lineWidth = Math.round(2 * textScale);
  roundRect(resultCtx, cardX, cardY, cardW, cardH, Math.round(12 * textScale));
  resultCtx.fill();
  resultCtx.stroke();

  // Текст характеристик
  let detailY = cardY + Math.round(30 * textScale);
  const lineH = Math.round(48 * textScale);

  for (const detail of details) {
    resultCtx.textAlign = "left";
    resultCtx.font = `${detailSize}px 'Segoe UI', Arial, sans-serif`;
    resultCtx.fillStyle = "#9e94b8";
    resultCtx.fillText(detail.label + ":", cardX + Math.round(30 * textScale), detailY);

    resultCtx.textAlign = "right";
    resultCtx.font = `bold ${detailSize}px 'Segoe UI', Arial, sans-serif`;
    resultCtx.fillStyle = "#e8e0f0";
    resultCtx.fillText(detail.value, cardX + cardW - Math.round(30 * textScale), detailY);

    // Разделитель
    resultCtx.strokeStyle = "#2d2650";
    resultCtx.lineWidth = 1;
    resultCtx.beginPath();
    resultCtx.moveTo(cardX + Math.round(30 * textScale), detailY + Math.round(10 * textScale));
    resultCtx.lineTo(cardX + cardW - Math.round(30 * textScale), detailY + Math.round(10 * textScale));
    resultCtx.stroke();

    detailY += lineH;
  }

  // Описание
  const descSize = Math.round(18 * textScale);
  resultCtx.textAlign = "center";
  resultCtx.font = `${descSize}px 'Segoe UI', Arial, sans-serif`;
  resultCtx.fillStyle = "#9e94b8";

  const desc = result.description;
  const maxChars = Math.round(70 * textScale / 18);
  if (desc.length > maxChars) {
    const mid = desc.lastIndexOf(" ", maxChars);
    const line1 = desc.substring(0, mid);
    const line2 = desc.substring(mid + 1);
    resultCtx.fillText(line1, resultW / 2, cardY + cardH + Math.round(35 * textScale));
    resultCtx.fillText(line2, resultW / 2, cardY + cardH + Math.round(60 * textScale));
  } else {
    resultCtx.fillText(desc, resultW / 2, cardY + cardH + Math.round(45 * textScale));
  }

  // Конвертируем в Blob
  return new Promise((resolve, reject) => {
    resultCanvas.toBlob((blob) => {
      if (blob) {
        console.log("[screenshot] Blob created, size:", blob.size, "bytes");
        resolve(blob);
      } else {
        reject(new Error("Failed to create blob from canvas"));
      }
    }, "image/png");
  });
}

/**
 * Вспомогательная функция для рисования скруглённого прямоугольника
 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}