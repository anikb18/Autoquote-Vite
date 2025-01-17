import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

export async function ensureUserProfile(user: User) {
  try {
    // Check if profile exists
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      // Create profile if it doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            avatar_url: user.user_metadata?.avatar_url || '',
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error('Error creating profile:', createError);
        throw createError;
      }

      // Create a sample vehicle and quote for new users
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([
          {
            make: 'Toyota',
            model: 'Supra',
            year: 2025,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (vehicleError) {
        console.error('Error creating vehicle:', vehicleError);
        throw vehicleError;
      }

      const { error: quoteError } = await supabase
        .from('quotes')
        .insert([
          {
            user_id: user.id,
            vehicle_id: vehicle.id,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);

      if (quoteError) {
        console.error('Error creating quote:', quoteError);
        throw quoteError;
      }

      return newProfile;
    }

    return profile;
  } catch (error) {
    console.error('Error ensuring user profile:', error);
    throw error;
  }
}
