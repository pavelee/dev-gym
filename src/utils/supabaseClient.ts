import { createClient } from "@refinedev/supabase";

  const SUPABASE_URL = "https://iaiehtxyrhfliwjacaai.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhaWVodHh5cmhmbGl3amFjYWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTM0NTkxNywiZXhwIjoyMDA0OTIxOTE3fQ.0jiPWeR03_Gr8H_IXTeerFcrsb6XKqk2qSX2SPiFTmQ";
  

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
