const container = document.getElementById("appointmentsContainer");
const currentPeriod = document.getElementById("currentPeriod");
const prevBtn = document.getElementById("prevPeriod");
const nextBtn = document.getElementById("nextPeriod");
const modeButtons = document.querySelectorAll(".mode-btn");

let viewMode = "month";
let currentDate = new Date();

function getFakeLoad() {
  const value = Math.floor(Math.random() * 4);
  if (value === 0) return "free";
  if (value === 1) return "partial";
  return "full";
}

function getMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay(); // 0=Sun
  return { year, month, daysInMonth, firstWeekday };
}

function renderMonthView() {
  container.className = "grid grid-cols-7 gap-2 w-full";
  container.innerHTML = "";

  const { year, month, daysInMonth, firstWeekday } = getMonthDays(currentDate);
  const startOffset = (firstWeekday + 6) % 7;

  const monthName = currentDate.toLocaleString("uk-UA", { month: "long" });
  currentPeriod.textContent = `${monthName} ${year}`;

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "aspect-square";
    container.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "aspect-square border rounded text-center cursor-pointer flex items-center justify-center text-sm font-medium";

    const load = getFakeLoad();
    if (load === "partial") div.classList.add("bg-yellow-200");
    else if (load === "full") div.classList.add("bg-red-300");
    else div.classList.add("bg-green-100");

    div.textContent = day;
    div.addEventListener("click", () => {
      currentDate.setDate(day);
      setMode("day");
    });

    container.appendChild(div);
  }
}

function renderWeekView() {
  container.className = "grid grid-cols-7 gap-2 w-full";
  container.innerHTML = "";

  const currentDay = currentDate.getDay();
  const mondayOffset = (currentDay + 6) % 7;
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - mondayOffset);

  const options = { day: "numeric", month: "short" };
  currentPeriod.textContent = `Тиждень ${monday.toLocaleDateString("uk-UA", options)} — ${new Date(monday.getTime() + 6 * 86400000).toLocaleDateString("uk-UA", options)}`;

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const div = document.createElement("div");
    div.className = "aspect-square border rounded text-center cursor-pointer flex flex-col items-center justify-center text-sm";

    const load = getFakeLoad();
    if (load === "partial") div.classList.add("bg-yellow-200");
    else if (load === "full") div.classList.add("bg-red-300");
    else div.classList.add("bg-green-100");

    div.innerHTML = `
      <div class="font-semibold">${date.toLocaleDateString("uk-UA", { weekday: "short" })}</div>
      <div>${date.getDate()}</div>
    `;

    div.addEventListener("click", () => {
      currentDate = date;
      setMode("day");
    });

    container.appendChild(div);
  }
}

function renderDayView() {
  container.className = "grid grid-cols-3 gap-2 w-full";
  container.innerHTML = "";

  currentPeriod.textContent = currentDate.toLocaleDateString("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const startHour = 9;
  const endHour = 18;

  for (let hour = startHour; hour < endHour; hour++) {
    const div = document.createElement("div");
    div.className = "aspect-square border rounded flex flex-col items-center justify-center text-sm";

    const time = `${hour.toString().padStart(2, "0")}:00`;
    const status = getFakeLoad();

    div.innerHTML = `
      <div class="font-semibold">${time}</div>
      <div class="${status === "full" ? "text-red-600" : status === "partial" ? "text-yellow-600" : "text-green-600"}">
        ${status === "full" ? "Зайнято" : status === "partial" ? "Частково" : "Вільно"}
      </div>
    `;

    container.appendChild(div);
  }
}

function changePeriod(offset) {
  if (viewMode === "month") {
    currentDate.setMonth(currentDate.getMonth() + offset);
  } else if (viewMode === "week" || viewMode === "day") {
    currentDate.setDate(currentDate.getDate() + 7 * offset);
  }
  renderCurrentView();
}

function setMode(mode) {
  viewMode = mode;
  modeButtons.forEach(btn => {
    btn.classList.toggle("bg-gray-200", btn.dataset.mode === mode);
  });
  renderCurrentView();
}

function renderCurrentView() {
  if (viewMode === "month") renderMonthView();
  else if (viewMode === "week") renderWeekView();
  else renderDayView();
}

prevBtn.addEventListener("click", () => changePeriod(-1));
nextBtn.addEventListener("click", () => changePeriod(1));

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

renderCurrentView();
