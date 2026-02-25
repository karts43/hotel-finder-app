// import { createClient } from "@supabase/supabase-js";

// // const supabaseUrl = "https://kasfwkzpfdfrnmapmlly.supabase.co";
// const supabaseAnonKey = "sb_publishable_r9fkmPF5XIM2t-6n25cKMQ_exQBEvLg";

// export const supabase = createClient(
//   "https://fxumdqlihxzkqevkzrjc.supabase.co",
//   "sb_publishable_ZY82hg6qPECHZKyu4gCYzw_twGPJr2j",
// );

// const supabaseUrl = "https://usxxjjhptrmzcxupqvfk.supabase.co";
// const supabaseAnonKey = "sb_publishable_bVU-db15gnVHnrlnG2kspg_lQlVktff";

import { createClient } from "@supabase/supabase-js";


let VITE_SUPABASE_URL = "https://kasfwkzpfdfrnmapmlly.supabase.co"
// let VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY = "sb_publishable_r9fkmPF5XIM2t-6n25cKMQ_exQBEvLg"
let VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthc2Z3a3pwZmRmcm5tYXBtbGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTYyNTYsImV4cCI6MjA4NzQ5MjI1Nn0._ysuQepQ4AqRXE6_RzSz3lE_bWYDkizaS0X01l_Sez8"


export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);