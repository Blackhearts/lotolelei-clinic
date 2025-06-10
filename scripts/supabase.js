// Initialize Supabase client
const supabaseUrl = 'https://ctzvvqthrnnujtkpezpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0enZ2cXRocm5udWp0a3BlenB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTczNzUsImV4cCI6MjA2NTA5MzM3NX0.Ckh7WiVUx7SYzycyLJUf98wkKqR70PwLCTFUoTYC920';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Export for use in other modules
export { supabase };
