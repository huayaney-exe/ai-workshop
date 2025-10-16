import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client (will be undefined if env vars not set)
// This allows the build to succeed even without env vars
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Type definition for workshop application data
export interface WorkshopApplication {
  id?: number;
  nombre: string;
  email: string;
  linkedin: string;
  referido_por?: string;
  experiencia: string;
  motivacion?: string; // Optional for progressive saves
  created_at?: string;

  // Progressive lead capture fields
  status?: 'step_1_complete' | 'step_2_complete' | 'confirmed';
  dropped_at_step?: number;
  last_updated_at?: string;
  lead_id?: string;

  // New fields from updated form
  empresa?: string;
  cargo?: string;
  telefono?: string;
  codigo_pais?: string;
  fue_referido?: boolean;
  confirmacion?: boolean;
  precio_final?: number;
  codigo_cupon?: string;
}
