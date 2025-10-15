import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definition for workshop application data
export interface WorkshopApplication {
  nombre: string;
  email: string;
  linkedin: string;
  referido_por?: string;
  experiencia: string;
  motivacion: string;
  created_at?: string;
}
