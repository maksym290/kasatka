import { supabase } from './supabaseClient.js';

window.addEventListener("DOMContentLoaded", async () => {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

  if (!tgUser) {
    alert("Ви не авторизовані через Telegram. Будь ласка, відкрийте додаток через Telegram.");
    return;
  }

  const { id, first_name, last_name, username, photo_url } = tgUser;

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        telegram_id: String(id),
        first_name,
        last_name,
        username,
        photo_url,
      },
      { onConflict: ['telegram_id'] }
    );

  if (error) {
    console.error("Помилка збереження користувача:", error);
    alert("Помилка при збереженні користувача");
    return;
  }

  localStorage.setItem("kasatka_user", JSON.stringify(tgUser));
  window.location.href = "index.html";
});
