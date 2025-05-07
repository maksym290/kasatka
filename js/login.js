window.onTelegramAuth = async (user) => {
  localStorage.setItem("kasatka_user", JSON.stringify(user));
  window.location.href = "index.html";
};
