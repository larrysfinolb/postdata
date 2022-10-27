import { createClient } from '@supabase/supabase-js';

const supabaseURL: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
