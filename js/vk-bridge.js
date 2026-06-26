// vk-bridge.js — работа с VK Bridge (VK Mini App API)
// Используется для получения данных о пользователе внутри мини-приложения ВК

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

  try {
    // Отправляем запрос на получение информации о пользователе
    const userInfo = await vkBridge.send("VKWebAppGetUserInfo");
    console.log("VK Bridge: получен пользователь:", userInfo.id, userInfo.first_name);
    return userInfo;
  } catch (error) {
    console.error("VK Bridge: ошибка получения пользователя:", error);
    return null;
  }
}