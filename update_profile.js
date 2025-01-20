import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://zndolceqzclnprozyudy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const userId = 'a86f11e2-bed7-474c-94d3-34cb8196828c';

async function updateProfileToAdmin(userId) {
  if (!supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
  }

  const url = `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`;
  const headers = {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  // Check if profile exists and has admin role
  const checkResponse = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  if (!checkResponse.ok) {
    throw new Error(`Failed to check profile: ${checkResponse.status} ${checkResponse.statusText}`);
  }

  const existingProfile = await checkResponse.json();

  if (existingProfile.length > 0 && existingProfile[0].role === 'admin') {
    console.log('Profile already has admin role.');
    return;
  }

  const body = {
    role: 'admin'
  };

  const response = await fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
  }

  const updatedProfile = await response.json();
  console.log('Updated profile:', updatedProfile);
}

updateProfileToAdmin(userId)
  .then(() => console.log('Successfully updated profile to admin.'))
  .catch(error => console.error('Error updating profile:', error));
