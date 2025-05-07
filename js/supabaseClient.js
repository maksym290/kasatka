import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://xsouaboijvdbgbspycht.supabase.co";
const supabaseAnonKey = "твій_public_key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
