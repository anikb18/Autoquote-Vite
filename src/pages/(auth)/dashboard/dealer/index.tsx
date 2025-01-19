import React, { useEffect, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useAuth } from '@/features/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/Catalyst/button';
import { Plus, MessageSquare, Upload, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DealerStats } from '@/components/Dashboard/DealerStats'; 
// Lazy-loaded components
const MetricsCards = React.lazy(() => import('@/components/Metrics/MetricsCards'));
const QuoteAnalytics = React.lazy(() => import('@/components/Analytics/QuoteAnalytics'));
const LeadManagement = React.lazy(() => import('@/components/Leads/LeadManagement'));
const PerformanceMetrics = React.lazy(() => import('@/components/Analytics/PerformanceMetrics'));
const CommunicationHub = React.lazy(() => import('@/components/Communication/CommunicationHub'));
const DocumentCenter = React.lazy(() => import('@/components/Documents/DocumentCenter'));

export default function DealerDashboard() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();
  const { user } = useAuth();
  const [data, setData] = useState({ quotes: [], auctions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        if (user) {
          const quotesResponse = await supabase
            .from('quotes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);

          const auctionsResponse = await supabase
            .from('auctions')
            .select('*')
            .eq('dealer_id', user.id)
            .order('endDate', { ascending: false })
            .limit(5);

          if (quotesResponse.error || auctionsResponse.error) {
            throw new Error('Failed to fetch data');
          }

          setData({
            quotes: quotesResponse.data || [],
            auctions: auctionsResponse.data || [],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch_data();
  }, [user]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (viewMode !== 'dealer') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">{t('common.unauthorized')}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{t('dashboard.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">{t('dashboard.description')}</p>
        </div>
        <Link to="/dashboard/new-quote">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('newQuote')}
          </Button>
        </Link>
      </div>

      {/* Dealer Stats Section */}
      <DealerStats dealerId={user.id} />

      <div className="space-y-8">
        <Suspense fallback={<LoadingSpinner />}>
          <MetricsCards />
          <QuoteAnalytics quotes={data.quotes} />
          <LeadManagement />
          <PerformanceMetrics />
          <CommunicationHub />
          <DocumentCenter />
        </Suspense>
      </div>
    </div>
  );
}