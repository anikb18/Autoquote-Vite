import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseDatabase } from '../types/supabase';

type Database = SupabaseDatabase;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export let supabase: SupabaseClient<Database> | null = null;

export const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: 'public'
      }
    });
  }
  return supabase;
};
