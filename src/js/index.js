// Перевірка авторизації через Telegram
const telegramUser = localStorage.getItem("kasatka_user");
if (!telegramUser) {
  window.location.href = "login.html";
}
