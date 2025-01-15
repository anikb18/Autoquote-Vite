import { useState, useEffect } from 'react';
import { useAuth } from '@/pages/(auth)/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import md5 from 'md5';

export function UserAvatar() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function getAvatarUrl() {
      try {
        if (!user?.email) return;
        
        // First try to get from Supabase storage
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('email', user.email)
          .single();

        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        } else {
          // If no avatar in Supabase, use Gravatar
          const hash = md5(user.email.toLowerCase().trim());
          const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=mp`;
          setAvatarUrl(gravatarUrl);
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    }

    getAvatarUrl();
  }, [user?.email]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || !event.target.files[0]) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('email', user?.email);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user?.email || ''}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200" />
        )}
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-white shadow-sm cursor-pointer hover:bg-gray-100 flex items-center justify-center"
        >
          <span className="sr-only">Upload new avatar</span>
          <svg
            className="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </label>
        <input
          id="avatar-upload"
          name="avatar"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">
          {user?.email}
        </span>
        {uploading && (
          <span className="text-xs text-gray-500">Uploading...</span>
        )}
      </div>
    </div>
  );
}
