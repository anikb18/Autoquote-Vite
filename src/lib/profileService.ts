import { supabase } from './supabase';
import type { Database } from '@/types/supabase';
import { roleService } from './roleService';
import { Role } from '@/types/roles';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const profileService = {
  async getCurrentProfile() {
    console.log('Starting getCurrentProfile method');
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      console.log('User retrieval result:', { user, userError });

      if (userError) {
        console.error('Error retrieving user:', userError);
        throw userError;
      }

      if (!user) {
        console.error('No user logged in');
        throw new Error('No user logged in');
      }

      console.log('Fetching profile for user:', user.id);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log('Profile fetch result:', { profile, error });

      if (error) {
        console.error("Error fetching profile:", error);

        // If profile doesn't exist, create one with admin role
        if (error.code === "PGRST116") {
          console.log("Profile not found, creating admin profile...");
          const newProfile = {
            id: user.id,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || "",
            role: "admin" as Role,
          };

          console.log("Attempting to create profile with data:", newProfile);

          try {
            const createdProfile = await this.createProfile(newProfile);
            console.log("Created profile successfully:", createdProfile);
            return createdProfile;
          } catch (createError) {
            console.error("Detailed error creating profile:", {
              error: createError,
              profileData: newProfile
            });
            throw createError;
          }
        }

        throw error;
      }

      console.log("Found existing profile:", profile);
      return profile;
    } catch (error) {
      console.error('Unhandled error in getCurrentProfile:', error);
      throw error;
    }
  },

  async handleCreateProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const newProfile = {
        id: user.id,
        email: user.email,
        full_name: "", // Prompt user for their full name
        role: "user" as Role, // Default role, modify as necessary
      };
      console.log("Attempting to create profile...");
      await this.createProfile(newProfile);
    }
  },

  async createProfile(profile: Omit<Profile, "created_at">) {
    console.log("Inserting profile into database...");
    const { data, error } = await supabase
      .from("profiles")
      .insert([profile])
      .select()
      .single();
    console.log("Profile insertion result:", data, error);

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
  },

  async updateRole(userId: string, newRole: Role) {
    console.log(`Updating role for user ${userId} to ${newRole}`);
    return this.updateProfile(userId, { role: newRole });
  },

  async hasRole(userId: string, role: Role): Promise<boolean> {
    const profile = await this.getCurrentProfile();
    return roleService.isAuthorized(profile?.role, role);
  },

  async ensureAdminRole(userId: string) {
    console.log(`Ensuring user ${userId} has admin role`);
    const profile = await this.getCurrentProfile();
    if (profile?.role !== 'admin') {
      console.log(`User ${userId} does not have admin role. Updating...`);
      await this.updateRole(userId, 'admin');
      console.log(`User ${userId} role updated to admin.`);
    } else {
      console.log(`User ${userId} already has admin role.`);
    }
  }
}
