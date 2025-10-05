import { createClient } from '@supabase/supabase-js';

// Proyect Overview > Project API > Project URL
const SUPABASE_URL = "https://wwdxywghdouurdavbmyp.supabase.co";
// Proyect Settings > API Keys > Api Key > Publishable key
const SUPABASE_KEY = "sb_publishable_892Ds3x_rSHnDdw0Fb1fjQ_LPzG5FkJ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);