// result-image.js — генерация изображения с результатом теста для VK
// Использует Canvas для отрисовки карточки результата
import { createCompressedBlob } from "./screenshot.js";

/**
 * Генерирует Canvas-изображение с результатом теста
 * @param {Object} result - объект результата (title, wood, core, length, flexibility, description)
 * @returns {Promise<Blob>} - Blob изображения в формате JPEG (≤500KB)
 */
export async function generateResultImage(result) {
  // Размеры изображения (оптимально для VK: 1200x630)
  const WIDTH = 1200;
  const HEIGHT = 630;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  // === Фон ===
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, "#0f0c1a");
  gradient.addColorStop(0.5, "#1a1530");
  gradient.addColorStop(1, "#0f0c1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // === Декоративные элементы ===
  // Звёздочки
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const r = Math.random() * 2 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // === Иконка палочки ===
  ctx.font = "48px serif";
  ctx.textAlign = "center";
  ctx.fillText("🪄", WIDTH / 2, 70);

  // === Заголовок: название палочки ===
  ctx.font = "bold 36px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#b388ff";
  ctx.fillText(result.title, WIDTH / 2, 130);

  // === Карточка с характеристиками ===
  const cardX = 150;
  const cardY = 165;
  const cardW = WIDTH - 300;
  const cardH = 280;

  // Фон карточки
  ctx.fillStyle = "rgba(13, 11, 21, 0.9)";
  ctx.strokeStyle = "#2d2650";
  ctx.lineWidth = 2;
  roundRect(ctx, cardX, cardY, cardW, cardH, 12);
  ctx.fill();
  ctx.stroke();

  // Характеристики
  const details = [
    { label: "Древесина", value: result.wood },
    { label: "Сердцевина", value: result.core },
    { label: "Длина", value: result.length },
    { label: "Упругость", value: result.flexibility },
  ];

  ctx.textAlign = "left";
  const startX = cardX + 40;
  let startY = cardY + 40;
  const lineHeight = 48;

  for (const detail of details) {
    // Лейбл
    ctx.font = "22px 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "#9e94b8";
    ctx.fillText(detail.label + ":", startX, startY);

    // Значение
    ctx.font = "bold 22px 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "#e8e0f0";
    ctx.textAlign = "right";
    ctx.fillText(detail.value, cardX + cardW - 40, startY);

    // Разделитель
    ctx.strokeStyle = "#2d2650";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, startY + 10);
    ctx.lineTo(cardX + cardW - 40, startY + 10);
    ctx.stroke();

    ctx.textAlign = "left";
    startY += lineHeight;
  }

  // === Описание ===
  ctx.font = "18px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#9e94b8";

  // Перенос описания, если слишком длинное
  const maxChars = 70;
  const desc = result.description;
  if (desc.length > maxChars) {
    const mid = desc.lastIndexOf(" ", maxChars);
    const line1 = desc.substring(0, mid);
    const line2 = desc.substring(mid + 1);
    ctx.fillText(line1, WIDTH / 2, cardY + cardH + 35);
    ctx.fillText(line2, WIDTH / 2, cardY + cardH + 60);
  } else {
    ctx.fillText(desc, WIDTH / 2, cardY + cardH + 45);
  }

  // === Ссылка ===
  ctx.font = "20px 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = "#4a76a8";
  ctx.fillText("А какая палочка достанется тебе? Пройди тест →", WIDTH / 2, HEIGHT - 40);

  // === Нижняя линия ===
  ctx.strokeStyle = "rgba(179, 136, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, HEIGHT - 55);
  ctx.lineTo(WIDTH - 200, HEIGHT - 55);
  ctx.stroke();

  // Конвертируем в Blob с контролем размера (≤500KB для VK)
  return createCompressedBlob(canvas, "image/jpeg", 0.85);
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