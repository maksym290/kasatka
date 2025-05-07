import { authGuard } from "./auth.js";
import { fetchProfile, fetchServices, fetchSchedule } from "./api.js";
import { handleError } from "./utils.js";

authGuard();

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const profile = await fetchProfile();
    if (profile.data) {
      document.getElementById("profileInfo").innerHTML = `
        <div>${profile.data.full_name}</div>
        <div>${profile.data.qualification}</div>
        <div>${profile.data.address}</div>
      `;
    }

    const services = await fetchServices();
    if (services.data) {
      document.getElementById("servicesList").innerHTML = services.data.services
        .map((s) => `<li>${s.title} - ${s.price} грн (${s.duration} хв)</li>`).join('');
    }

    const schedule = await fetchSchedule();
    if (schedule.data) {
      document.getElementById("scheduleList").innerHTML = schedule.data.schedule
        .map((s) => `<li>${s.day}: ${s.start}–${s.end}</li>`).join('');
    }
  } catch (error) {
    handleError(error);
  }
});
