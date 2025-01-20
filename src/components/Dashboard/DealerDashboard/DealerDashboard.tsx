'use client';

import { useRoleAccess } from '@/hooks/useRoleAccess';
import { useTranslation } from 'react-i18next';
import { fetchDealerStats } from '@/lib/dealer';
import { PerformanceMetrics } from '../PerformanceMetrics';
import { QuotesList } from '@/components/Dashboard/Quotes/QuotesList';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { motion } from 'framer-motion';
import { ArrowUpRight, Car, DollarSign, Users, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function DealerDashboard() {
  const t = useTranslations('Dashboard');
  const { user, userRole } = useRoleAccess();
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const supabase = getSupabaseClient();
    
    // Subscribe to real-time notifications
    const subscription = supabase
      .channel('dealer-quotes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'dealer_notifications',
          filter: `dealer_id=eq.${user.id}`
        },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Fetch initial stats
    fetchDealerStats(user.id)
      .then(setStats)
      .catch((error) => {
        console.error('Error fetching dealer stats:', error);
        setError(error.message);
      })
      .finally(() => {});

    return () => {
      subscription.unsubscribe();
    };
  }, [user.id]);

  if (!userRole) return <div>Please log in to access the dashboard.</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('dealer.welcome')}
          </h1>
          <NotificationBell count={notifications.length} />
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <PerformanceMetrics stats={stats} />
        </div>

        <QuotesList quotes={stats?.recentQuotes || []} />
      </div>
    </div>
  );
}
