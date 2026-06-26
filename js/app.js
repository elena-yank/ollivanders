// app.js — ядро приложения: рендеринг, навигация, состояние
import { questions } from "./questions.js";
import { findResult } from "./results.js";
import { initParallaxBg, setParallaxBg, clearParallaxBg } from "./parallax-bg.js";
import { sendMessageToUser, uploadAndGetAttachment } from "./vk-api.js";
import { getVkUserInfo } from "./vk-bridge.js";
import { captureResultScreenshot } from "./screenshot.js";

// === Состояние ===
const state = {
  currentQuestionIndex: 0,
  answers: {}, // { q1: "height_short", q2: "eyes_brown", ... }
  isFinished: false,
  result: null,
};

// === DOM-ссылки ===
const app = document.getElementById("app");

// === Рендеринг ===
function render() {
  if (state.isFinished) {
    renderResultScreen();
  } else {
    renderQuestion(state.currentQuestionIndex);
  }
}

// === Экран вопроса ===
function renderQuestion(index) {
  const question = questions[index];
  const total = questions.length;
  const qKey = `q${question.id}`;
  const selected = state.answers[qKey] || null;

  // Фон с 3D-параллаксом для вопросов с изображением
  const bgImages = {
    0: "bg/q1.jpg",
    1: "bg/q2.jpg",
    2: "bg/q3.jpg",
    3: "bg/q4.jpg",
    4: "bg/q5.jpg",
    5: "bg/q6.jpg",
    6: "bg/q7.jpg",
  };
  const bgPath = bgImages[index];
  if (bgPath) {
    setParallaxBg(bgPath);
    document.body.classList.add("question-bg");
  } else {
    document.body.classList.remove("question-bg");
    clearParallaxBg();
  }

  let answersHtml = "";
  for (const answer of question.answers) {
    const checked = selected === answer.key ? "checked" : "";
    answersHtml += `
      <label class="answer-option ${checked ? "selected" : ""}">
        <input type="radio" name="q${question.id}" value="${answer.key}" ${checked} />
        <span class="radio-custom"></span>
        <span class="answer-text">${answer.text}</span>
      </label>
    `;
  }

  const answersListClass = "answers-list answers-list--cols-3";

  app.innerHTML = `
    <div class="screen question-screen">
      <div class="question-counter"><span class="counter-current">${index + 1}</span><span class="counter-slash">/</span><span class="counter-total">${total}</span></div>
      <h2 class="question-text">${question.text}</h2>
      <div class="${answersListClass}">
        ${answersHtml}
      </div>
      <div class="nav-buttons">
        <button class="btn btn-secondary" id="btn-prev" ${index === 0 ? "disabled" : ""}>
          ← Назад
        </button>
        <button class="btn btn-primary" id="btn-next" ${!selected ? "disabled" : ""}>
          ${index === total - 1 ? "Завершить" : "Далее →"}
        </button>
      </div>
    </div>
  `;

  // Обработчики выбора ответа
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      state.answers[qKey] = e.target.value.toLowerCase();
      // Визуальное обновление
      document.querySelectorAll(".answer-option").forEach((opt) => {
        opt.classList.toggle(
          "selected",
          opt.querySelector("input").checked
        );
      });
      document.getElementById("btn-next").disabled = false;
    });
  });

  // Кнопка "Назад"
  document.getElementById("btn-prev").addEventListener("click", () => {
    state.currentQuestionIndex--;
    render();
  });

  // Кнопка "Далее" / "Завершить"
  document.getElementById("btn-next").addEventListener("click", () => {
    if (index === total - 1) {
      finishTest();
    } else {
      state.currentQuestionIndex++;
      render();
    }
  });
}

// === Завершение теста ===
function finishTest() {
  state.isFinished = true;
  try {
    state.result = findResult(state.answers);
  } catch (e) {
    state.result = null;
  }
  render();
  saveToLocalStorage();
  // Отправляем результат в ЛС пользователю (если он в ВК)
  // Ждём немного, чтобы DOM и фоновое изображение успели отрисоваться
  setTimeout(() => {
    sendResultToUser();
  }, 800);
}

/**
 * Скачивает Blob как файл на устройство пользователя
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Отправляет результат теста пользователю в ЛС от имени группы
 * с прикреплённым скриншотом результата
 */
async function sendResultToUser() {
  if (!state.result) return;

  try {
    // 1. Получаем информацию о пользователе через VK Bridge
    const userInfo = await getVkUserInfo();
    if (!userInfo || !userInfo.id) {
      console.log("Не удалось получить ID пользователя — пропускаем отправку ЛС");
      return;
    }

    // 2. Пытаемся сделать скриншот через Canvas (без html2canvas)
    let imageBlob = null;
    try {
      // Сначала пробуем новый метод с фоновым изображением и эллипсом
      imageBlob = await captureResultScreenshot(state.result);
      console.log("[sendResult] Скриншот через Canvas создан, размер:", imageBlob.size);
    } catch (screenshotError) {
      console.warn("[sendResult] captureResultScreenshot не сработал:", screenshotError);
      // Fallback: используем старый генератор изображения
      try {
        imageBlob = await generateResultImage(state.result);
        console.log("[sendResult] Запасное изображение создано, размер:", imageBlob.size);
      } catch (fallbackError) {
        console.error("[sendResult] Оба метода создания изображения не сработали:", fallbackError);
        alert("Ошибка создания изображения: " + fallbackError.message);
      }
    }

    // Автоматически скачиваем скриншот на устройство пользователя
    if (imageBlob) {
      downloadBlob(imageBlob, "wand-result.png");
      console.log("[sendResult] Скриншот скачан на устройство");
    }

    // 3. Формируем текст сообщения
    const message = `🪄 Олливандер помог подобрать тебе волшебную палочку!\n\n` +
      `✨ ${state.result.title}\n` +
      `📏 Длина: ${state.result.length}\n` +
      `🔄 Упругость: ${state.result.flexibility}\n\n` +
      `${state.result.description}\n\n` +
      `Пройти тест: https://vk.com/app54654657`;

    // 4. Отправляем сообщение без скриншота
    try {
      await sendMessageToUser(userInfo.id, message);
      console.log("[sendResult] Сообщение отправлено пользователю", userInfo.id);
    } catch (sendError) {
      console.error("[sendResult] Ошибка отправки сообщения:", sendError);
      alert("Ошибка отправки сообщения: " + sendError.message);
    }
  } catch (error) {
    console.error("[sendResult] Общая ошибка:", error);
    alert("Общая ошибка: " + error.message);
  }
}

// === Экран результата ===
function renderResultScreen() {
  document.body.classList.remove("question-bg");
  document.body.classList.add("result-bg");
  setParallaxBg("bg/result.jpg");
  const result = state.result;

  if (!result) {
    app.innerHTML = `
      <div class="screen result-screen">
        <div class="result-icon">🤔</div>
        <h1>Результат не найден</h1>
        <p class="result-description">
          К сожалению, для Вашей комбинации ответов пока нет подходящего результата.
          Возможно, разработчик ещё не добавил все варианты.
        </p>
        <button class="btn btn-primary" id="btn-restart">Пройти заново</button>
      </div>
    `;
    document.getElementById("btn-restart").addEventListener("click", resetTest);
  } else {
    app.innerHTML = `
      <div class="screen result-screen">
        <div class="result-icon">🪄</div>
        <h1>${result.title}</h1>
        <div class="result-card">
          <div class="result-details">
            <div class="detail-item">
              <span class="detail-label">Древесина:</span>
              <span class="detail-value">${result.wood}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Сердцевина:</span>
              <span class="detail-value">${result.core}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Длина:</span>
              <span class="detail-value">${result.length}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Упругость:</span>
              <span class="detail-value">${result.flexibility}</span>
            </div>
          </div>
          <p class="result-description">${result.description}</p>
        </div>
        <button class="btn btn-secondary btn-restart" id="btn-restart">Пройти заново</button>
      </div>
    `;

    // Кнопка "Пройти заново"
    document.getElementById("btn-restart").addEventListener("click", resetTest);
  }
}

// === Сброс теста ===
function resetTest() {
  state.currentQuestionIndex = 0;
  state.answers = {};
  state.isFinished = false;
  state.result = null;
  localStorage.removeItem("wandTestResult");
  render();
}

// === localStorage ===
function saveToLocalStorage() {
  try {
    localStorage.setItem(
      "wandTestResult",
      JSON.stringify({
        answers: state.answers,
        result: state.result,
      })
    );
  } catch (e) {
    // Игнорируем ошибки localStorage
  }
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem("wandTestResult");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.result) {
        state.answers = data.answers || {};
        state.isFinished = true;
        state.result = data.result;
        return true;
      }
    }
  } catch (e) {
    // Игнорируем
  }
  return false;
}

// === Инициализация VK Bridge (для каталога ВКонтакте) ===
function initVKBridge() {
  if (window.vkBridge) {
    // Отправляем событие инициализации нативному клиенту VK
    vkBridge.send("VKWebAppInit", {});
  }
}

// === Инициализация ===
function init() {
  // Инициализируем VK Bridge (для каталога ВКонтакте)
  initVKBridge();

  // Инициализируем DOM-структуру параллакс-фона
  initParallaxBg();

  if (loadFromLocalStorage()) {
    render();
  } else {
    state.currentQuestionIndex = 0;
    render();
  }
}

init();