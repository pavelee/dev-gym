import { createClient } from "@refinedev/supabase";

  const SUPABASE_URL = "https://iaiehtxyrhfliwjacaai.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhaWVodHh5cmhmbGl3amFjYWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNDU5MTcsImV4cCI6MjAwNDkyMTkxN30.AEyluPleVDZgncAZiG6CaRS_a4kFQZ7HVlMVbwJLg78";
  

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
