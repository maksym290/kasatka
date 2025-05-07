import { authGuard } from "./auth.js";
import { saveProfile, fetchProfile } from "./api.js";
import { handleError } from "./utils.js";

authGuard();

document.getElementById("saveProfile").onclick = async () => {
  const profileData = {
    full_name: document.getElementById("fullName").value,
    qualification: document.getElementById("qualification").value,
    address: document.getElementById("address").value,
    instagram: document.getElementById("instagram").value,
    facebook: document.getElementById("facebook").value,
  };

  try {
    await saveProfile(profileData);
    alert("Профіль збережено!");
  } catch (error) {
    handleError(error);
  }
};

window.onload = async () => {
  const { data } = await fetchProfile();
  if (data) {
    Object.entries(data).forEach(([key, val]) => {
      const el = document.getElementById(key);
      if (el) el.value = val;
    });
  }
};
