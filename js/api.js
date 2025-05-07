import { supabase } from "./supabaseClient.js";
import { getUser } from "./auth.js";

const telegramId = getUser()?.id;

export const saveProfile = async (profileData) =>
  await supabase.from("profiles").upsert({ telegram_id: telegramId, ...profileData });

export const fetchProfile = async () =>
  await supabase.from("profiles").select("*").eq("telegram_id", telegramId).single();

export const saveServices = async (services) =>
  await supabase.from("services").upsert({ telegram_id: telegramId, services });

export const fetchServices = async () =>
  await supabase.from("services").select("services").eq("telegram_id", telegramId).single();

export const saveSchedule = async (schedule) =>
  await supabase.from("schedules").upsert({ telegram_id: telegramId, schedule });

export const fetchSchedule = async () =>
  await supabase.from("schedules").select("schedule").eq("telegram_id", telegramId).single();
