import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://qvfqjmdosdnjlhergevi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZnFqbWRvc2RuamxoZXJnZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5OTg0NzUsImV4cCI6MjA1NjU3NDQ3NX0.iB6sX0xUyTbUpjOoWsk8v_wxYYzO889AhD7rV_XWbn8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://your-project-url.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "your-anon-key"; // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);*/