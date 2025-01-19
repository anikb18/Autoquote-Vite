import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

// Types
type Profile = Database['public']['Tables']['profiles']['Row'];
type Quote = Database['public']['Tables']['quotes']['Row'];
type Auction = Database['public']['Tables']['auctions']['Row'];

// User Management
export const isMockUser = (user: User | null): boolean => {
  return Boolean(user?.email?.includes('mock'));
};

export async function ensureUserProfile(user: User): Promise<Profile | null> {
  if (!user) return null;

  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (existingProfile) {
      return existingProfile;
    }

    // Create new profile if it doesn't exist
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name,
        role: 'user', // default role
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newProfile;
  } catch (error) {
    console.error('Error in ensureUserProfile:', error);
    return null;
  }
}

// Quotes Management
export async function fetchQuotes(userId?: string): Promise<Quote[]> {
  try {
    let query = supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

// Auctions Management
export async function fetchAuctions(userId?: string): Promise<Auction[]> {
  try {
    let query = supabase
      .from('auctions')
      .select('*')
      .order('enddate', { ascending: false }) // Ensure this matches the actual column name
      .limit(5);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}

// Data Initialization
export async function initializeUserData(user: User | null) {
  if (!user) return null;

  try {
    const profile = await ensureUserProfile(user);
    const [auctions, quotes] = await Promise.all([
      fetchAuctions(user.id),
      fetchQuotes(user.id),
    ]);

    return {
      profile,
      auctions,
      quotes,
    };
  } catch (error) {
    console.error('Error initializing user data:', error);
    return null;
  }
}

// Profile Management
export async function updateUserProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
}

// Subscription Management
export async function checkUserSubscription(userId: string) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return null;
  }
}

// Fetch buyer quotes with details
export async function fetchBuyerQuotesWithDetails(userId: string) {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        dealer_quotes (
          id,
          status,
          dealer_id,
          is_accepted,
          dealer_profiles (
            dealer_name
          )
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching buyer quotes:', error);
    return [];
  }
}