import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseClient } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          // Exchange code for session
          const { data: { session }, error } = await getSupabaseClient().auth.exchangeCodeForSession(code);

          if (error) {
            throw error;
          }

          if (session) {
            navigate('/dashboard', { replace: true });
          } else {
            navigate('/sign-in', { replace: true });
          }
        } else {
          navigate('/sign-in', { replace: true });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/sign-in', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-main to-secondary/20">
      <LoadingSpinner />
    </div>
  );
}
