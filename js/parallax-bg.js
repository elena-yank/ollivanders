// parallax-bg.js — 3D-параллакс для фоновых изображений
// Создаёт эффект лёгкого изменения ракурса фона при движении мыши

const CONFIG = {
  // Максимальный угол наклона по X и Y (в градусах)
  maxTiltX: 4,   // наклон вперёд-назад
  maxTiltY: 5,   // наклон влево-вправо
  // Коэффициент сглаживания (0–1): 1 = мгновенно, меньше = плавнее
  smoothFactor: 0.020,
  // Масштаб изображения (чтобы скрыть края при повороте)
  scale: 1.12,
};

let layer = null;
let targetRotateX = 0;
let targetRotateY = 0;
let currentRotateX = 0;
let currentRotateY = 0;
let rafId = null;
let isActive = false;

/**
 * Создаёт DOM-структуру параллакс-фона и вставляет в <body>.
 * Вызывается один раз при инициализации.
 */
export function initParallaxBg() {
  // Уже создан?
  if (document.getElementById("parallax-bg")) return;

  const container = document.createElement("div");
  container.id = "parallax-bg";

  const layerEl = document.createElement("div");
  layerEl.id = "parallax-bg-layer";
  container.appendChild(layerEl);

  const overlay = document.createElement("div");
  overlay.id = "parallax-bg-overlay";
  container.appendChild(overlay);

  document.body.prepend(container);
  layer = layerEl;

  // Слушаем движение мыши
  document.addEventListener("mousemove", onMouseMove, { passive: true });

  // На тач-устройствах отключаем эффект (или можно сделать по гироскопу)
  // Пока просто не запускаем анимацию, если нет мыши
}

/**
 * Устанавливает фоновое изображение для параллакс-слоя.
 * @param {string} imageUrl — URL изображения (например, "../bg/q1.jpg")
 */
export function setParallaxBg(imageUrl) {
  if (!layer) return;
  layer.style.backgroundImage = `url("${imageUrl}")`;
  layer.style.transform = `scale(${CONFIG.scale})`;
  activate();
}

/**
 * Убирает фоновое изображение (возврат к тёмному фону).
 */
export function clearParallaxBg() {
  if (!layer) return;
  layer.style.backgroundImage = "none";
  deactivate();
}

/**
 * Активирует анимационный цикл.
 */
function activate() {
  if (isActive) return;
  isActive = true;
  currentRotateX = 0;
  currentRotateY = 0;
  targetRotateX = 0;
  targetRotateY = 0;
  loop();
}

/**
 * Останавливает анимационный цикл и сбрасывает трансформ.
 */
function deactivate() {
  isActive = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (layer) {
    layer.style.transform = `scale(${CONFIG.scale})`;
  }
}

/**
 * Обработчик движения мыши — вычисляет целевые углы.
 */
function onMouseMove(e) {
  if (!isActive) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // Нормализуем позицию мыши в диапазон [-1, 1]
  const nx = (e.clientX / w) * 2 - 1; // -1 слева, 1 справа
  const ny = (e.clientY / h) * 2 - 1; // -1 сверху, 1 снизу

  targetRotateY = nx * CONFIG.maxTiltY;
  targetRotateX = -ny * CONFIG.maxTiltX;
}

/**
 * Анимационный цикл — плавно интерполирует текущие углы к целевым.
 */
function loop() {
  if (!isActive) return;

  // Линейная интерполяция (LERP) для плавности
  currentRotateX += (targetRotateX - currentRotateX) * CONFIG.smoothFactor;
  currentRotateY += (targetRotateY - currentRotateY) * CONFIG.smoothFactor;

  if (layer) {
    layer.style.transform = `
      scale(${CONFIG.scale})
      rotateX(${currentRotateX}deg)
      rotateY(${currentRotateY}deg)
    `;
  }

  rafId = requestAnimationFrame(loop);
}