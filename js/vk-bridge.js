// vk-bridge.js — работа с VK Bridge (VK Mini App API)
// Используется для получения данных о пользователе внутри мини-приложения ВК

/**
 * Проверяет, запущено ли приложение внутри iframe ВКонтакте
 * @returns {boolean}
 */
function isInVkFrame() {
  try {
    return window.self !== window.top &&
      (window.location.href.includes("vk.com") ||
       window.location.href.includes("vk.ru") ||
       document.referrer.includes("vk.com") ||
       document.referrer.includes("vk.ru"));
  } catch (e) {
    // Cross-origin: значит мы во фрейме, но с другого домена
    // Это нормально для VK — они грузят с vk.com или vk.ru
    return true;
  }
}

/**
 * Получает информацию о текущем пользователе через VK Bridge
 * @returns {Promise<{id: number, first_name: string, last_name: string}|null>}
 */
export async function getVkUserInfo() {
  // Проверяем, доступен ли VK Bridge
  if (typeof vkBridge === "undefined") {
    console.log("VK Bridge не доступен — приложение запущено вне ВК");
    return null;
  }

  // Проверяем, есть ли параметры запуска VK в URL
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("vk_app_id") && !urlParams.has("vk_user_id")) {
    console.log("Нет параметров запуска VK — пропускаем VK Bridge запросы");
    return null;
  }

  try {
    // Отправляем запрос на получение информации о пользователе
    const userInfo = await vkBridge.send("VKWebAppGetUserInfo");
    if (!userInfo || !userInfo.id) {
      console.warn("VK Bridge: получен пустой ответ");
      return null;
    }
    console.log("VK Bridge: получен пользователь:", userInfo.id, userInfo.first_name);
    return userInfo;
  } catch (error) {
    console.warn("VK Bridge: ошибка получения пользователя (некритично):", error?.message || error);
    return null;
  }
}