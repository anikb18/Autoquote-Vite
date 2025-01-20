import { useEffect, useState } from 'react';
import { profileService } from '../lib/profileService';
import type { Database } from '../types/supabase';
import { supabase } from '../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProfileTest() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await profileService.getCurrentProfile();
        setProfile(profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        loadProfile();
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    loadProfile();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
