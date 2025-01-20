// src/hooks/useNotifications.ts
import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export const useNotifications = (dealerId: string) => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const supabase = getSupabaseClient();
    
    const subscription = supabase
      .channel('dealer-quotes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'dealer_notifications',
          filter: `dealer_id=eq.${dealerId}`
        },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [dealerId]);

  return notifications;
};
