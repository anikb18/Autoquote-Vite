import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthProvider';
import { AdminDashboardContent } from '@/pages/(auth)/admin/AdminDashboardContent';
import DealerDashboard from '@/pages/(auth)/dashboard/dealer/index.tsx';
import UserDashboard from '@/components/Dashboard/UserDashboard/UserDashboard';
import { getSupabaseClient } from '@/lib/supabase';
const supabase = getSupabaseClient();
import { mockQuotes, mockAuctions } from '@/mockData';
import { ensureUserProfile, fetchQuotes, fetchAuctions, isMockUser } from '@/lib/supabase-utils';

// Define columns for quotes
const quoteColumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "vehicle", header: "Vehicle" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "price", header: "Price" },
];

export function DashboardContent() {
  console.log('DashboardContent component is rendering');
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [latestQuotes, setLatestQuotes] = useState<any[]>([]);
  const [latestAuctions, setLatestAuctions] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quotes = isMockUser(user.email) ? mockQuotes : await fetchQuotes(user.id);
        const auctions = isMockUser(user.email) ? mockAuctions : await fetchAuctions(user.id);
        
        setLatestQuotes(quotes || []);
        setLatestAuctions(auctions || []);
        
        const { data: analyticsData, error: analyticsError } = await supabase
          .from('dealer_quotes')
          .select('dealer_id, status');

        if (analyticsError) throw analyticsError;

        const dealerAnalytics = analyticsData.reduce((acc, quote) => {
          const dealerId = quote.dealer_id;
          if (!acc[dealerId]) {
            acc[dealerId] = { dealerId, dealsWon: 0, dealsLost: 0, dealsAnswered: 0 };
          }
          if (quote.status === 'accepted') {
            acc[dealerId].dealsWon += 1;
          } else if (quote.status === 'rejected') {
            acc[dealerId].dealsLost += 1;
          }
          acc[dealerId].dealsAnswered += 1;
          return acc;
        }, {});

        setAnalytics(Object.values(dealerAnalytics));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkUserProfile = async () => {
      if (user) {
        try {
          await ensureUserProfile(user);
        } catch (error) {
          console.error('Error ensuring user profile:', error);
        }
      }
    };

    fetchData();
    checkUserProfile();
  }, [user]);

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isDealer = user?.publicMetadata?.role === 'dealer';
  const isUser = user?.publicMetadata?.role === 'user';

  return (
    <div className="space-y-6">
      {isAdmin && <AdminDashboardContent analytics={analytics} />}
      {isDealer && <DealerDashboard />}
      {isUser && <UserDashboard user={user} />}
    </div>
  );
}
