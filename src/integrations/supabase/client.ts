// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dyrbnvapunkovcawuhvm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5cmJudmFwdW5rb3ZjYXd1aHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTczMDcsImV4cCI6MjA2NTg3MzMwN30.aS02svn8gb8EZaBFrkJfsAww8-1uI4H_iBgNh7yXcEA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);