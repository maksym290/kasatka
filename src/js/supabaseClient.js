import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = "https://xsouaboijvdbgbspycht.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzb3VhYm9panZkYmdic3B5Y2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MjM4MTAsImV4cCI6MjA2MjE5OTgxMH0.n8jN_yOGZOH7kdYqKfc7phqLuzsrZVJx4xiGgrV25JM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
