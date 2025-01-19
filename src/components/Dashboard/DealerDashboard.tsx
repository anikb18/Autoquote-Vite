'use client';

import { useRoleAccess } from '@/hooks/useRoleAccess';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Car, DollarSign, Users, Bell, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Import your Supabase client

export default function DealerDashboard() {
  const { t } = useTranslation('dashboard');
  const { isDealer, isAdmin } = useRoleAccess();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for the super admin
  const mockData = {
    activeQuotes: 12,
    wonBids: 45,
    leads: 68,
    revenue: "$45,678",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin) {
        // If the user is a super admin, use mock data
        setData(mockData);
        setLoading(false);
        return;
      }

      // Fetch dealer data from Supabase
      const { data: dealerData, error } = await supabase
        .from('dealers') // Replace with your actual table name
        .select('*')
        .eq('email', 'dealer@example.com') // Replace with the actual dealer's email
        .single();

      if (error) {
        console.error('Error fetching dealer data:', error);
      } else {
        setData(dealerData);
      }
      setLoading(false);
    };

    fetchData();
  }, [isAdmin]);

  if (loading) return <div>{t('loading')}</div>; // Show loading message

  if (!isDealer) return null; // If not a dealer, return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900">{t('dealer.welcome')}</h1>
        
        {/* Stats Overview */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t('dealer.stats.activeQuotes')}
            value={data.activeQuotes}
            change="+3"
            type="positive"
            icon={<Car className="h-5 w-5" />}
            accentColor="#446df6"
          />
          <StatCard
            title={t('dealer.stats.wonBids')}
            value={data.wonBids}
            change="+5"
            type="positive"
            icon={<DollarSign className="h-5 w-5" />}
            accentColor="#003139"
          />
          <StatCard
            title={t('dealer.stats.leads')}
            value={data.leads}
            change="+12"
            type="positive"
            icon={<Users className="h-5 w-5" />}
            accentColor="#d1d2c3"
          />
          <StatCard
            title={t('dealer.stats.revenue')}
            value={data.revenue}
            change="+12"
            type="positive"
            icon={<DollarSign className="h-5 w-5" />}
            accentColor="#446df6"
          />
        </div>

        {/* Other dashboard content... */}
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, change, type, icon, accentColor }: {
  title: string;
  value: string;
  change: string;
  type: 'positive' | 'negative';
  icon: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#446df6] transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-[#446df6]/5 to-transparent" />
      <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`text-sm font-medium ${type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {change}%
        </p>
      </dd>
    </div>
  );
}