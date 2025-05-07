const imageInput = document.getElementById("serviceImage");
const imagePreview = document.getElementById("imagePreview");
const titleInput = document.getElementById("serviceTitle");
const durationInput = document.getElementById("serviceDuration");
const priceInput = document.getElementById("servicePrice");
const saveBtn = document.getElementById("saveService");
const servicesList = document.getElementById("servicesList");

const data = JSON.parse(localStorage.getItem("kasatka_master")) || {};
data.services = data.services || [];

let currentImageBase64 = "";

// Відображення попереднього перегляду зображення
imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    currentImageBase64 = event.target.result;
    imagePreview.src = currentImageBase64;
    imagePreview.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});

// Збереження послуги
saveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const duration = durationInput.value.trim();
  const price = priceInput.value.trim();

  if (!title || !duration || !price) {
    alert("Заповніть усі поля");
    return;
  }

  const newService = {
    id: Date.now(),
    title,
    duration,
    price,
    image: currentImageBase64,
  };

  data.services.push(newService);
  localStorage.setItem("kasatka_master", JSON.stringify(data));

  renderServiceCard(newService);
  clearForm();
});

// Вивід усіх збережених послуг
data.services.forEach(renderServiceCard);

// Картка однієї послуги
function renderServiceCard(service) {
  const div = document.createElement("div");
  div.className = "flex items-center gap-4 bg-gray-50 p-4 rounded shadow";

  div.innerHTML = `
    <img src="${service.image}" class="w-20 h-20 object-cover rounded" />
    <div class="flex-1">
      <h3 class="font-semibold">${service.title}</h3>
      <p class="text-sm text-gray-600">${service.duration} хв • ${service.price} грн</p>
    </div>
    <button class="edit-btn text-blue-600 hover:underline text-sm">Редагувати</button>
  `;

  servicesList.appendChild(div);
}

// Очистка форми після збереження
function clearForm() {
  titleInput.value = "";
  durationInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
  imagePreview.src = "";
  imagePreview.classList.add("hidden");
  currentImageBase64 = "";
}
