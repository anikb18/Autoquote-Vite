import { supabase } from './supabase';
import type { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const profileService = {
  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }

    return profile;
  },

  async handleCreateProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const newProfile = {
        id: user.id,
        email: user.email,
        full_name: '', // Prompt user for their full name
        role: 'user', // Default role, modify as necessary
      };
      await this.createProfile(newProfile);
    }
  },

  async createProfile(profile: Omit<Profile, 'created_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }

    return data;
  },

  async updateProfile(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    return data;
  }
};