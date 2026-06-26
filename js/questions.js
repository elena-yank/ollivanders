// questions.js — данные 7 вопросов теста
// Каждый ответ имеет ключ (key) для сопоставления с результатами

export const questions = [
  {
    id: 1,
    text: "Прежде всего, Вы бы описали себя как...",
    answers: [
      { key: "height_medium", text: "Человека среднего роста" },
      { key: "height_tall", text: "Человека высокого роста" },
      { key: "height_short", text: "Человека невысокого роста" },
    ],
  },
  {
    id: 2,
    text: "А глаза у Вас...",
    answers: [
      { key: "eyes_dark_brown", text: "Тёмно-карие или чёрные" },
      { key: "eyes_blue", text: "Голубые" },
      { key: "eyes_gray", text: "Серые" },
      { key: "eyes_brown", text: "Карие" },
      { key: "eyes_hazel", text: "Ореховые" },
      { key: "eyes_gray_blue", text: "Голубо-серые" },
      { key: "eyes_green", text: "Зелёные" },
      { key: "eyes_blue_green", text: "Голубо-зелёные" },
      { key: "eyes_other", text: "Другие" },
    ],
  },
  {
    id: 3,
    text: "День, в который Вы родились...",
    answers: [
      { key: "birthday_even", text: "Чётное число" },
      { key: "birthday_odd", text: "Нечётное число" },
    ],
  },
  {
    id: 4,
    text: "Больше всего Вы гордитесь своими...",
    answers: [
      { key: "pride_purposefulness", text: "Целеустремлённостью" },
      { key: "pride_imagination", text: "Воображением" },
      { key: "pride_perseverance", text: "Стойкостью" },
      { key: "pride_intellect", text: "Интеллектом" },
      { key: "pride_originality", text: "Оригинальностью" },
      { key: "pride_optimism", text: "Оптимизмом" },
      { key: "pride_kindness", text: "Добротой" },
    ],
  },
  {
    id: 5,
    text: "Путешествуя в одиночку по пустынной дороге, Вы подходите к перекрёстку. Куда вы направитесь дальше...",
    answers: [
      { key: "path_sea", text: "Налево — к морю" },
      { key: "path_castle", text: "Направо — к замку" },
      { key: "path_forest", text: "Прямо — к лесу" },
    ],
  },
  {
    id: 6,
    text: "Больше всего Вы боитесь...",
    answers: [
      { key: "fear_fire", text: "Огня" },
      { key: "fear_darkness", text: "Темноты" },
      { key: "fear_loneliness", text: "Одиночества" },
      { key: "fear_heights", text: "Высоты" },
      { key: "fear_closed_spaces", text: "Замкнутых пространств" },
    ],
  },
  {
    id: 7,
    text: "В сундуке с волшебными артефактами Вам приглянётся...",
    answers: [
      { key: "artifact_dagger", text: "Серебряный кинжал" },
      { key: "artifact_mirror", text: "Узорное зеркало" },
      { key: "artifact_gem", text: "Сверкающий драгоценный камень" },
      { key: "artifact_scroll", text: "Перевязанный свиток" },
      { key: "artifact_key", text: "Золотой ключ" },
      { key: "artifact_bottle", text: "Пыльная бутылка" },
      { key: "artifact_glove", text: "Чёрная перчатка" },
    ],
  },
];