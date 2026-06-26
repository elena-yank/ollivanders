// app.js — ядро приложения: рендеринг, навигация, состояние
import { questions } from "./questions.js";
import { findResult } from "./results.js";
import { initParallaxBg, setParallaxBg, clearParallaxBg } from "./parallax-bg.js";
import { generateResultImage } from "./result-image.js";
import { uploadAndGetAttachment } from "./vk-api.js";
import { VK_CONFIG } from "./vk-config.js";

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
      console.log("DEBUG answer selected:", qKey, "=", e.target.value.toLowerCase());
      state.answers[qKey] = e.target.value.toLowerCase();
      console.log("DEBUG answers state:", JSON.stringify(state.answers));
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
    // Формируем текст для публикации
    const shareText = `🪄 Олливандер выдал мне волшебную палочку: ${result.title}!\n\n${result.description}\n\nДревесина: ${result.wood}\nСердцевина: ${result.core}\nДлина: ${result.length}\nУпругость: ${result.flexibility}\n\nА какая палочка достанется тебе? Пройди тест →`;

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
        <button class="btn btn-share" id="btn-share">
          <span class="btn-share-icon">📤</span>
          Поделиться результатом
        </button>
        <button class="btn btn-secondary btn-restart" id="btn-restart">Пройти заново</button>
      </div>
    `;

    // Кнопка "Поделиться результатом" через VK API
    document.getElementById("btn-share").addEventListener("click", () => {
      shareToVK(shareText);
    });

    // Кнопка "Пройти заново"
    document.getElementById("btn-restart").addEventListener("click", resetTest);
  }
}

// === Поделиться через VK API ===
async function shareToVK(text) {
  const btn = document.getElementById("btn-share");
  if (!btn) return;

  // Показываем состояние загрузки
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="btn-share-icon">⏳</span> Готовим изображение...';

  try {
    // 1. Генерируем изображение с результатом
    const imageBlob = await generateResultImage(state.result);

    btn.innerHTML = '<span class="btn-share-icon">⏳</span> Загружаем в ВК...';

    // 2. Загружаем изображение на сервер ВК и получаем attachment
    const { attachment } = await uploadAndGetAttachment(imageBlob);

    // 3. Открываем нативный диалог репоста ВКонтакте с прикреплённым фото
    //    В этом диалоге пользователь видит изображение и может:
    //    - опубликовать на своей стене
    //    - отправить в личные сообщения
    //    - отправить в беседу
    //    Изображение будет автоматически прикреплено к сообщению!
    btn.innerHTML = '<span class="btn-share-icon">📤</span> Открываем ВКонтакте...';

    window.open(
      `https://vk.com/repost.php?object=${attachment}`,
      "_blank",
      "width=650,height=450"
    );
  } catch (error) {
    console.error("VK Share error:", error);
    // Если VK API не сработал — даём пользователю скачать изображение
    try {
      const imageBlob = await generateResultImage(state.result);
      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "volshebnaya-palochka.png";
      a.click();
      URL.revokeObjectURL(url);

      // И открываем VK Share с текстом
      const encodedText = encodeURIComponent(
        `🪄 Олливандер выдал мне волшебную палочку: ${state.result.title}!\n\nА какая палочка достанется тебе? Пройди тест → ${window.location.href}`
      );
      window.open(
        `https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodedText}`,
        "_blank",
        "width=650,height=450"
      );
    } catch (e) {
      alert("Не удалось поделиться результатом. Попробуйте ещё раз.");
    }
  } finally {
    // Восстанавливаем кнопку
    btn.disabled = false;
    btn.innerHTML = originalText;
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

// === Инициализация ===
function init() {
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