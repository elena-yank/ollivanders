// screenshot.js — захват скриншота страницы с результатом теста
// Использует html2canvas для создания скриншота DOM-элемента

/**
 * Делает скриншот центральной части экрана результата,
 * попадающей в эллипс фонового изображения (без кнопки "Пройти заново").
 * @returns {Promise<Blob>} - Blob изображения в формате PNG
 */
export async function captureResultScreenshot() {
  // Находим элемент результата
  const resultScreen = document.querySelector(".result-screen");
  if (!resultScreen) {
    throw new Error("Result screen not found");
  }

  // Находим кнопку "Пройти заново" и скрываем её на время скриншота
  const restartBtn = document.getElementById("btn-restart");
  if (restartBtn) {
    restartBtn.style.display = "none";
  }

  // Также скрываем все кнопки внутри result-screen (share, restart)
  const allButtons = resultScreen.querySelectorAll(".btn");
  allButtons.forEach((btn) => {
    btn.style.display = "none";
  });

  try {
    // Ждём стабилизации параллакс-фона (сброс наклона)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Создаём скриншот всей страницы с высоким качеством
    const canvas = await html2canvas(document.body, {
      scale: 2, // 2x для чёткости
      useCORS: true,
      allowTaint: true,
      backgroundColor: null, // прозрачный фон
      logging: false,
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    // Вычисляем область эллипса: ellipse 50% 60% at 50% 50%
    // Это центральная часть: 50% ширины и 60% высоты
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const ellipseRadiusX = canvas.width * 0.25; // 50% / 2
    const ellipseRadiusY = canvas.height * 0.30; // 60% / 2

    // Создаём новый canvas для обрезки по эллипсу
    const resultCanvas = document.createElement("canvas");
    resultCanvas.width = ellipseRadiusX * 2;
    resultCanvas.height = ellipseRadiusY * 2;
    const ctx = resultCanvas.getContext("2d");

    // Рисуем эллиптическую маску
    ctx.beginPath();
    ctx.ellipse(
      ellipseRadiusX,
      ellipseRadiusY,
      ellipseRadiusX,
      ellipseRadiusY,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();

    // Копируем центральную часть исходного canvas в resultCanvas
    ctx.drawImage(
      canvas,
      centerX - ellipseRadiusX,
      centerY - ellipseRadiusY,
      ellipseRadiusX * 2,
      ellipseRadiusY * 2,
      0,
      0,
      ellipseRadiusX * 2,
      ellipseRadiusY * 2
    );

    // Конвертируем в Blob
    return new Promise((resolve, reject) => {
      resultCanvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob from canvas"));
        }
      }, "image/png");
    });
  } finally {
    // Восстанавливаем видимость кнопок
    if (restartBtn) {
      restartBtn.style.display = "";
    }
    allButtons.forEach((btn) => {
      btn.style.display = "";
    });
  }
}