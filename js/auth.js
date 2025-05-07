import { supabase } from "./supabaseClient.js";

export const getUser = () => JSON.parse(localStorage.getItem("kasatka_user"));

export const logout = () => {
  localStorage.removeItem("kasatka_user");
  window.location.href = "login.html";
};

export const authGuard = () => {
  if (!getUser()) {
    window.location.href = "login.html";
  }
};
