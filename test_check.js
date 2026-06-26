// Полная проверка: все возможные комбинации ответов
import { questions } from "./js/questions.js";
import { findResult, resultRules, resultTypes } from "./js/results.js";

// Собираем все возможные ответы по каждому вопросу
const questionAnswers = {};
for (const q of questions) {
  const qKey = `q${q.id}`;
  questionAnswers[qKey] = q.answers.map(a => a.key);
}

console.log("Количество ответов на каждый вопрос:");
for (const [qKey, answers] of Object.entries(questionAnswers)) {
  console.log(`  ${qKey}: ${answers.length} вариантов — [${answers.join(", ")}]`);
}

// Общее число возможных комбинаций
let totalCombos = 1;
for (const answers of Object.values(questionAnswers)) {
  totalCombos *= answers.length;
}
console.log(`\nВсего возможных комбинаций ответов: ${totalCombos}`);

// Проверяем, какие resultId существуют в resultTypes
const definedResultIds = new Set(Object.keys(resultTypes));
const usedResultIds = new Set(resultRules.map(r => r.resultId));

console.log(`\nОпределено типов результатов (resultTypes): ${definedResultIds.size}`);
console.log(`Используется в правилах (resultRules): ${usedResultIds.size}`);

// Какие resultId есть в resultTypes, но нет ни одного правила?
const missingRules = [...definedResultIds].filter(id => !usedResultIds.has(id));
if (missingRules.length > 0) {
  console.log(`\n❌ Типы результатов БЕЗ правил (${missingRules.length}):`);
  for (const id of missingRules) {
    console.log(`  - ${id} (${resultTypes[id].title})`);
  }
} else {
  console.log(`\n✅ Все типы результатов имеют хотя бы одно правило`);
}

// Какие resultId есть в правилах, но нет в resultTypes?
const missingTypes = [...usedResultIds].filter(id => !definedResultIds.has(id));
if (missingTypes.length > 0) {
  console.log(`\n❌ Правила ссылаются на отсутствующие resultTypes:`);
  for (const id of missingTypes) {
    console.log(`  - ${id}`);
  }
} else {
  console.log(`\n✅ Все resultId из правил существуют в resultTypes`);
}

// Проверяем дубликаты правил (одинаковые комбинации условий)
console.log(`\n=== Проверка дубликатов правил ===`);
const seen = new Map();
let duplicates = 0;
for (let i = 0; i < resultRules.length; i++) {
  const rule = resultRules[i];
  const key = JSON.stringify(rule.conditions);
  if (seen.has(key)) {
    duplicates++;
    console.log(`❌ Дубликат #${duplicates}: правило ${i} (${rule.resultId}) совпадает с правилом ${seen.get(key)}`);
    console.log(`   Условия: ${key}`);
  } else {
    seen.set(key, i);
  }
}
if (duplicates === 0) {
  console.log(`✅ Дубликатов не найдено`);
}

// Проверяем, какие комбинации ответов НЕ покрыты правилами
// (выборочно: проверяем все комбинации первых 3 вопросов × все варианты остальных)
console.log(`\n=== Поиск непокрытых комбинаций (выборочно) ===`);

// Функция для рекурсивного перебора
function findUncovered(selected, depth) {
  const qKeys = Object.keys(questionAnswers);
  if (depth === qKeys.length) {
    const result = findResult(selected);
    return result !== null ? 1 : 0;
  }
  
  const qKey = qKeys[depth];
  let covered = 0;
  let total = 0;
  
  for (const answer of questionAnswers[qKey]) {
    selected[qKey] = answer;
    const result = findResult(selected);
    if (result) {
      covered++;
    }
    total++;
  }
  
  return { covered, total };
}

// Проверяем покрытие для каждого вопроса в отдельности (фиксируя остальные)
console.log("\nПроверка покрытия по каждому вопросу (с фиксацией остальных по ПЕРВОМУ правилу):");
const firstRuleConditions = resultRules[0].conditions;
const allQKeys = Object.keys(questionAnswers);

for (let qIdx = 0; qIdx < allQKeys.length; qIdx++) {
  const testKey = allQKeys[qIdx];
  const testAnswers = questionAnswers[testKey];
  
  let covered = 0;
  for (const ans of testAnswers) {
    const testCombo = { ...firstRuleConditions, [testKey]: ans };
    const result = findResult(testCombo);
    if (result) covered++;
  }
  
  const status = covered === testAnswers.length ? "✅" : "⚠️";
  console.log(`  ${status} ${testKey}: покрыто ${covered}/${testAnswers.length} вариантов`);
  if (covered < testAnswers.length) {
    for (const ans of testAnswers) {
      const testCombo = { ...firstRuleConditions, [testKey]: ans };
      const result = findResult(testCombo);
      if (!result) {
        console.log(`     ❌ Не покрыт: ${testKey}=${ans}`);
      }
    }
  }
}

// Статистика по правилам
console.log(`\n=== Статистика ===`);
console.log(`Всего правил: ${resultRules.length}`);
console.log(`Всего типов результатов: ${definedResultIds.size}`);

// Группировка по дереву/сердцевине
const woodCoreCount = {};
for (const rule of resultRules) {
  const type = resultTypes[rule.resultId];
  if (type) {
    const key = `${type.wood} + ${type.core}`;
    woodCoreCount[key] = (woodCoreCount[key] || 0) + 1;
  }
}
console.log(`\nПравил по типам древесины+сердцевины:`);
for (const [key, count] of Object.entries(woodCoreCount).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${key}: ${count} правил`);
}