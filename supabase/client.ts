import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://utmoiqlmgvfqkcblmyvv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bW9pcWxtZ3ZmcWtjYmxteXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzMzA4MzQsImV4cCI6MjAzNTkwNjgzNH0.WriOFKMZg99c6qVfQNsRyxCk5PP0d3B4fCyvKwiUk_w");

export { supabase };