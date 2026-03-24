import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nwtjfjsdobutjkowdhdb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dGpmanNkb2J1dGprb3dkaGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNzkyNDYsImV4cCI6MjA4OTk1NTI0Nn0.e8mGru8zb5CEX2DIIKm1RqYPwSf8WjY2y2gmaxPzsX0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);