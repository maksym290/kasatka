import { authGuard } from "./auth.js";
import { saveServices, fetchServices } from "./api.js";
import { handleError } from "./utils.js";

authGuard();

document.getElementById("addService").onclick = () => {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Назва">
    <input placeholder="Тривалість">
    <input placeholder="Ціна">
  `;
  document.getElementById("servicesContainer").appendChild(div);
};

window.onload = async () => {
  const { data } = await fetchServices();
  if (data) {
    data.services.forEach((s) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <input value="${s.title}">
        <input value="${s.duration}">
        <input value="${s.price}">
      `;
      document.getElementById("servicesContainer").appendChild(div);
    });
  }
};
