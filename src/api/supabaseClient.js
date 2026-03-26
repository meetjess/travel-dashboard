import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nwtjfjsdobutjkowdhdb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6oQUlJaeIaBAjB8jk8vYDg_t5huF3OC";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);