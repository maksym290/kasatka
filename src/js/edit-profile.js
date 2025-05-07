const fullNameInput = document.getElementById("fullName");
const qualificationInput = document.getElementById("qualification");
const addressInput = document.getElementById("address");
const instagramInput = document.getElementById("instagram");
const facebookInput = document.getElementById("facebook");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");
const saveBtn = document.getElementById("saveProfile");

// Завантаження збережених даних
const data = JSON.parse(localStorage.getItem("kasatka_master")) || {};

fullNameInput.value = data.fullName || "";
qualificationInput.value = data.qualification || "";
addressInput.value = data.address || "";
instagramInput.value = data.instagram || "";
facebookInput.value = data.facebook || "";
if (data.avatarBase64) {
  avatarPreview.src = data.avatarBase64;
  avatarPreview.classList.remove("hidden");
}

// Попередній перегляд зображення
avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    avatarPreview.src = event.target.result;
    avatarPreview.classList.remove("hidden");
    data.avatarBase64 = event.target.result;
  };
  reader.readAsDataURL(file);
});

// Збереження
saveBtn.addEventListener("click", () => {
  data.fullName = fullNameInput.value.trim();
  data.qualification = qualificationInput.value.trim();
  data.address = addressInput.value.trim();
  data.instagram = instagramInput.value.trim();
  data.facebook = facebookInput.value.trim();

  localStorage.setItem("kasatka_master", JSON.stringify(data));
  alert("Профіль збережено");
  window.location.href = "index.html";
});
