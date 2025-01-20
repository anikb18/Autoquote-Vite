import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthProvider';
import { AdminDashboardContent } from '@/pages/(auth)/admin/AdminDashboardContent'; // Import Admin Dashboard
import DealerDashboard from '@/pages/(auth)/dashboard/dealer/index.tsx'; // Import Dealer Dashboard
import UserDashboard from '@/components/Dashboard/UserDashboard/UserDashboard'; // Import User Dashboard
import { CarViewer } from '@/components/Dashboard/CarViewer/CarViewer';
import { QuotesTable } from '@/components/Dashboard/DataTables/QuotesTable';
import { AuctionsTable } from '@/components/Dashboard/DataTables/AuctionsTable';
import { QuoteStatusChart } from '@/components/Dashboard/DataChart/QuoteStatusChart';
import { QuoteRequestForm } from '@/components/Dashboard/Quotes/QuoteRequestForm';
import { mockQuotes, mockAuctions } from '@/mockData';
import { supabase } from '@/lib/supabase';

// Generate mock chart data for the last 30 days
const MOCK_CHART_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100),
  };
});

// Check if the user is a mock user (for testing purposes)
const isMockUser = (userEmail: string) => userEmail === "anikbeauchemin18@gmail.com";

export function DashboardContent() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [chartData] = useState<any[]>(MOCK_CHART_DATA); // Chart data for the QuoteStatusChart
  const [latestQuotes, setLatestQuotes] = useState<any[]>([]); // Latest quotes data
  const [latestAuctions, setLatestAuctions] = useState<any[]>([]); // Latest auctions data
  const [loadingQuotes, setLoadingQuotes] = useState(true); // Loading state for quotes
  const [loadingAuctions, setLoadingAuctions] = useState(true); // Loading state for auctions
  const [error, setError] = useState<string | null>(null); // Error state for API calls

  // Fetch quotes and auctions data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quotes
        const quotes = isMockUser(user.email) ? mockQuotes : await fetchRealQuotes();
        setLatestQuotes(quotes || []);

        // Fetch auctions
        const auctions = isMockUser(user.email) ? mockAuctions : await fetchRealAuctions();
        setLatestAuctions(auctions || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.'); // Set error message
      } finally {
        setLoadingQuotes(false);
        setLoadingAuctions(false);
      }
    };

    fetchData();
  }, [user.email]);

  // Show loading state while data is being fetched
  if (loadingQuotes || loadingAuctions) {
    return <div className="text-center py-6">{t('loading')}</div>;
  }

  // Show error message if data fetching fails
  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  // Determine user role
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isDealer = user?.publicMetadata?.role === 'dealer';
  const isUser = user?.publicMetadata?.role === 'user';

  return (
    <div className="space-y-6">
      {isAdmin && <AdminDashboardContent analytics={[]} />} {/* Pass analytics if needed */}
      {isDealer && <DealerDashboard />}
      {isUser && <UserDashboard user={user} />}

      {/* 3D Car Viewer */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('dashboard.carViewer')}</h2>
        <CarViewer car={{ make: 'Honda', model: 'CR-V', year: 2024 }} />
      </div>

      {/* Quote Request Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('dashboard.requestQuote')}</h2>
        <QuoteRequestForm />
      </div>

      {/* Latest Quotes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('dashboard.latestQuotes')}</h2>
        <QuotesTable data={latestQuotes} />
      </div>

      {/* Latest Auctions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('dashboard.latestAuctions')}</h2>
        <AuctionsTable data={latestAuctions} />
      </div>

      {/* Quote Status Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('dashboard.quoteStatus')}</h2>
        <QuoteStatusChart data={chartData} />
      </div>
    </div>
  );
}

// Mock function for fetching real quotes (replace with actual API call)
const fetchRealQuotes = async () => {
  // TODO: Replace with actual API call
  return [];
};

// Mock function for fetching real auctions (replace with actual API call)
const fetchRealAuctions = async () => {
  // TODO: Replace with actual API call
  return [];
};