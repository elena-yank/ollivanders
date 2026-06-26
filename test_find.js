// Тест: проверяем, что findResult работает
import { questions } from "./js/questions.js";
import { findResult, resultRules } from "./js/results.js";

// Берём первое правило и проверяем
const firstRule = resultRules[0];
console.log("Первое правило:", JSON.stringify(firstRule, null, 2));

// Собираем ответы как их собрал бы app.js
const selectedKeys = {};
for (const [qKey, answerKey] of Object.entries(firstRule.conditions)) {
  selectedKeys[qKey] = answerKey;
}

console.log("\nСобранные ключи:", JSON.stringify(selectedKeys));

// Вызываем findResult
const result = findResult(selectedKeys);
console.log("\nРезультат findResult:", result);

if (result) {
  console.log("\n✅ НАЙДЕН! Палочка:", result.title);
} else {
  console.log("\n❌ НЕ НАЙДЕН!");
}

// Проверим все правила
console.log("\n=== Проверка всех правил ===");
let found = 0;
let notFound = 0;
for (const rule of resultRules) {
  const keys = {};
  for (const [qKey, answerKey] of Object.entries(rule.conditions)) {
    keys[qKey] = answerKey;
  }
  const res = findResult(keys);
  if (res) {
    found++;
  } else {
    notFound++;
    console.log("❌ Не найден для rule:", rule.resultId, JSON.stringify(keys));
  }
}
console.log(`\nНайдено: ${found}, Не найдено: ${notFound}`);