import { Session as SupabaseSession } from '@supabase/supabase-js';

export interface UserMetadata {
  role: string; // Adjust this based on your actual user metadata structure
}

export interface Session extends SupabaseSession {
  user_metadata?: UserMetadata; // Add user_metadata property
}
