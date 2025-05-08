import { authGuard } from "./auth.js";
import { saveServices, fetchServices } from "./api.js";
import { handleError } from "./utils.js";

authGuard();

const servicesContainer = document.getElementById("servicesContainer");

// Функція створення елемента послуги
function createServiceCard(service = {}) {
  const div = document.createElement("div");
  div.className = "grid grid-cols-3 gap-2 items-center bg-white p-4 rounded shadow";

  div.innerHTML = `
    <input type="text" class="title border px-2 py-1 rounded" placeholder="Назва" value="${service.title || ""}" />
    <input type="text" class="duration border px-2 py-1 rounded" placeholder="Хвилин" value="${service.duration || ""}" />
    <input type="text" class="price border px-2 py-1 rounded" placeholder="Ціна грн" value="${service.price || ""}" />
    <button class="saveService bg-blue-600 text-white px-3 py-1 rounded col-span-3 w-fit mt-2 hover:bg-blue-700">Зберегти</button>
  `;

  const saveButton = div.querySelector(".saveService");
  saveButton.addEventListener("click", async () => {
    const title = div.querySelector(".title").value.trim();
    const duration = div.querySelector(".duration").value.trim();
    const price = div.querySelector(".price").value.trim();

    if (!title || !duration || !price) {
      alert("Усі поля обовʼязкові");
      return;
    }

    try {
      const all = document.querySelectorAll("#servicesContainer .grid");
      const updated = Array.from(all).map((el) => ({
        title: el.querySelector(".title").value.trim(),
        duration: el.querySelector(".duration").value.trim(),
        price: el.querySelector(".price").value.trim(),
      }));

      await saveServices({ services: updated });
      alert("Послуги збережено");
    } catch (err) {
      handleError(err);
    }
  });

  servicesContainer.appendChild(div);
}

// Додати нову порожню послугу
document.getElementById("addService").onclick = () => {
  createServiceCard();
};

// Підвантажити збережені послуги
window.onload = async () => {
  try {
    const { data } = await fetchServices();
    if (data?.services?.length) {
      data.services.forEach((service) => createServiceCard(service));
    }
  } catch (err) {
    handleError(err);
  }
};
