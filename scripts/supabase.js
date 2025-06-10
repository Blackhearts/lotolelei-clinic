// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Export for use in other modules
export { supabase };