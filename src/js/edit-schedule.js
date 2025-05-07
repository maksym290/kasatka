const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const scheduleContainer = document.getElementById("scheduleContainer");
const saveBtn = document.getElementById("saveSchedule");

const data = JSON.parse(localStorage.getItem("kasatka_master")) || {};
data.schedule = data.schedule || [];

// Заголовок рядка з чіткою шириною колонок
const header = document.createElement("div");
header.className = "grid grid-cols-[80px_1fr_1fr_2fr] gap-4 mb-2 font-medium text-sm text-gray-600";
header.innerHTML = `
  <div></div>
  <div>Початок</div>
  <div>Кінець</div>
  <div>Перерва (з–до)</div>
`;
scheduleContainer.appendChild(header);

// Генерація графіку
weekdays.forEach((day, index) => {
  const saved = data.schedule.find((s) => s.day === day) || {};
  const row = document.createElement("div");
  row.className = "grid grid-cols-[80px_1fr_1fr_2fr] gap-4 items-center";

  row.innerHTML = `
    <label class="font-medium">${day}</label>
    <input type="time" class="start border px-2 py-1 rounded" value="${saved.start || ""}" />
    <input type="time" class="end border px-2 py-1 rounded" value="${saved.end || ""}" />
    <div class="grid grid-cols-2 gap-2">
      <input type="time" class="breakStart border px-2 py-1 rounded" value="${saved.breakStart || ""}" />
      <input type="time" class="breakEnd border px-2 py-1 rounded" value="${saved.breakEnd || ""}" />
    </div>
  `;

  scheduleContainer.appendChild(row);
});

// Збереження
saveBtn.addEventListener("click", () => {
  const rows = document.querySelectorAll("#scheduleContainer > div.grid-cols-\\[80px_1fr_1fr_2fr\\]");
  const schedule = [];

  rows.forEach((row, i) => {
    const start = row.querySelector(".start").value;
    const end = row.querySelector(".end").value;
    const breakStart = row.querySelector(".breakStart").value;
    const breakEnd = row.querySelector(".breakEnd").value;

    if (start && end) {
      schedule.push({
        day: weekdays[i],
        start,
        end,
        breakStart: breakStart || "",
        breakEnd: breakEnd || ""
      });
    }
  });

  data.schedule = schedule;
  localStorage.setItem("kasatka_master", JSON.stringify(data));
  alert("Графік збережено");
  window.location.href = "index.html";
});
