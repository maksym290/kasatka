import { authGuard } from "./auth.js";
import { saveSchedule, fetchSchedule } from "./api.js";
import { handleError } from "./utils.js";

authGuard();

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

days.forEach(day => {
  const div = document.createElement("div");
  div.innerHTML = `${day}: <input type="time"> – <input type="time">`;
  document.getElementById("scheduleContainer").appendChild(div);
});

document.getElementById("saveSchedule").onclick = async () => {
  const schedule = days.map((day, i) => {
    const inputs = scheduleContainer.children[i].querySelectorAll("input");
    return { day, start: inputs[0].value, end: inputs[1].value };
  });

  try {
    await saveSchedule(schedule);
    alert("Графік збережено!");
  } catch (error) {
    handleError(error);
  }
};
