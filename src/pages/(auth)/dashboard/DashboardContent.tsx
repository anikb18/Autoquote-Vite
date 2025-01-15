import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useAuth } from '../providers/AuthProvider';
import { 
  PiChartLineUpBold, 
  PiCarFill, 
  PiHandshakeFill, 
  PiChartBarBold, 
  PiHouseBold, 
  PiCurrencyDollarBold, 
  PiBellRingingFill, 
  PiChatCircleTextFill, 
  PiClockCountdownFill, 
  PiEnvelopeFill, 
  PiShieldCheckFill, 
  PiStarFill, 
  PiTimerFill, 
  PiTrendUpBold, 
  PiUsersBold 
} from 'react-icons/pi';
import { UserDashboard } from './UserDashboard';
import { DataChart } from '@/components/ui/data-chart';
import { DataTable } from '@/components/ui/data-table';
import { cn } from '@/lib/utils';

const DASHBOARD_DATA = {
  admin: {
    stats: [
      {
        id: 1,
        name: 'dashboard.stats.total_dealers',
        value: '45',
        icon: PiHouseBold,
        change: '+12%',
        changeType: 'positive',
        description: 'dashboard.stats.active_dealers',
      },
      {
        id: 2,
        name: 'dashboard.stats.total_revenue',
        value: '$248,000',
        icon: PiCurrencyDollarBold,
        change: '+18%',
        changeType: 'positive',
        description: 'dashboard.stats.monthly_revenue',
      },
      {
        id: 3,
        name: 'dashboard.stats.total_users',
        value: '2,845',
        icon: PiUsersBold,
        change: '+22%',
        changeType: 'positive',
        description: 'dashboard.stats.active_users',
      },
      {
        id: 4,
        name: 'dashboard.stats.conversion_rate',
        value: '32%',
        icon: PiTrendUpBold,
        change: '+5%',
        changeType: 'positive',
        description: 'dashboard.stats.quote_to_sale',
      },
      {
        id: 5,
        name: 'dashboard.stats.system_health',
        value: '99.9%',
        icon: PiShieldCheckFill,
        change: '+0.1%',
        changeType: 'positive',
        description: 'dashboard.stats.uptime',
      },
    ],
    quickActions: [
      { name: 'dashboard.actions.view_reports', href: '/dashboard/analytics', icon: PiChartBarBold },
      { name: 'dashboard.actions.manage_dealers', href: '/dashboard/dealers', icon: PiHouseBold },
      { name: 'dashboard.actions.security_alerts', href: '/dashboard/security', icon: PiShieldCheckFill },
    ],
  },
  dealer: {
    stats: [
      {
        id: 1,
        name: 'dashboard.stats.active_quotes',
        value: '12',
        icon: PiChatCircleTextFill,
        change: '+8%',
        changeType: 'positive',
        description: 'dashboard.stats.pending_quotes',
      },
      {
        id: 2,
        name: 'dashboard.stats.total_value',
        value: '$138,000',
        icon: PiCurrencyDollarBold,
        change: '+12%',
        changeType: 'positive',
        description: 'dashboard.stats.potential_revenue',
      },
      {
        id: 3,
        name: 'dashboard.stats.conversion_rate',
        value: '32%',
        icon: PiChartBarBold,
        change: '+5%',
        changeType: 'positive',
        description: 'dashboard.stats.quote_acceptance',
      },
      {
        id: 4,
        name: 'dashboard.stats.active_auctions',
        value: '8',
        icon: PiHandshakeFill,
        change: '+3',
        changeType: 'positive',
        description: 'dashboard.stats.live_auctions',
      },
      {
        id: 5,
        name: 'dashboard.stats.response_time',
        value: '2.5h',
        icon: PiTimerFill,
        change: '-15%',
        changeType: 'positive',
        description: 'dashboard.stats.avg_response',
      },
    ],
    quickActions: [
      { name: 'dashboard.actions.new_quote', href: '/dashboard/quotes/new', icon: PiCarFill },
      { name: 'dashboard.actions.view_auctions', href: '/dashboard/auctions', icon: PiHandshakeFill },
      { name: 'dashboard.actions.messages', href: '/dashboard/messages', icon: PiEnvelopeFill },
    ],
  },
  user: {
    stats: [
      {
        id: 1,
        name: 'dashboard.stats.active_quotes',
        value: '3',
        icon: PiCarFill,
        description: 'dashboard.stats.your_quotes',
      },
      {
        id: 2,
        name: 'dashboard.stats.best_offer',
        value: '$32,500',
        icon: PiStarFill,
        description: 'dashboard.stats.lowest_quote',
      },
      {
        id: 3,
        name: 'dashboard.stats.time_remaining',
        value: '18h',
        icon: PiClockCountdownFill,
        description: 'dashboard.stats.quote_expiry',
      },
    ],
    quickActions: [
      { name: 'dashboard.actions.request_quote', href: '/dashboard/request-quote', icon: PiCarFill },
      { name: 'dashboard.actions.view_quotes', href: '/dashboard/my-quotes', icon: PiChatCircleTextFill },
      { name: 'dashboard.actions.notifications', href: '/dashboard/notifications', icon: PiBellRingingFill },
    ],
  },
};

const MOCK_QUOTES = [
  {
    id: 1,
    vehicle: "2024 Honda CR-V",
    price: "$35,000",
    status: "pending",
  },
  {
    id: 2,
    vehicle: "2024 Toyota RAV4",
    price: "$38,000",
    status: "accepted",
  },
  {
    id: 3,
    vehicle: "2024 Mazda CX-5",
    price: "$33,000",
    status: "rejected",
  },
];

const MOCK_AUCTIONS = [
  {
    id: 1,
    vehicle: "2023 BMW X3",
    current_bid: "$42,000",
    time_left: "2h 30m",
  },
  {
    id: 2,
    vehicle: "2023 Mercedes GLC",
    current_bid: "$45,000",
    time_left: "1h 15m",
  },
  {
    id: 3,
    vehicle: "2023 Audi Q5",
    current_bid: "$41,000",
    time_left: "45m",
  },
];

const MOCK_CHART_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100)
  };
});

export default function DashboardContent() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();
  const { user } = useAuth();
  const [chartData] = useState<any[]>(MOCK_CHART_DATA);
  const [latestQuotes] = useState<typeof MOCK_QUOTES>(MOCK_QUOTES);
  const [latestAuctions] = useState<typeof MOCK_AUCTIONS>(MOCK_AUCTIONS);

  useEffect(() => {
    console.log('DashboardContent - Dependencies:', {
      viewMode,
      user: user ? {
        id: user.id,
        email: user.email,
        metadata: user.user_metadata
      } : null,
      chartData: chartData?.length,
      quotesData: latestQuotes?.length,
      auctionsData: latestAuctions?.length
    });
  }, [viewMode, user, chartData, latestQuotes, latestAuctions]);

  console.log('DashboardContent rendered:', { viewMode, user });

  if (!viewMode || !user) {
    console.log('DashboardContent - Loading state:', { viewMode, user });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  console.log('Rendering content for viewMode:', viewMode);

  const quoteColumns = [
    { accessorKey: 'vehicle', header: t('quotes.columns.vehicle') },
    { accessorKey: 'price', header: t('quotes.columns.price') },
    { 
      accessorKey: 'status', 
      header: t('quotes.columns.status'),
      cell: ({ row }: { row: any }) => {
        const status = row.getValue('status');
        const statusStyles = {
          pending: "bg-yellow-50/80 text-yellow-600 ring-yellow-500/10",
          accepted: "bg-green-50/80 text-green-600 ring-green-500/10",
          rejected: "bg-red-50/80 text-red-600 ring-red-500/10"
        };
        return (
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset backdrop-blur-sm",
            statusStyles[status as keyof typeof statusStyles]
          )}>
            {t(`quotes.status.${status}`)}
          </span>
        );
      }
    }
  ];

  const auctionColumns = [
    { accessorKey: 'vehicle', header: t('auctions.columns.vehicle') },
    { accessorKey: 'current_bid', header: t('auctions.columns.current_bid') },
    { accessorKey: 'time_left', header: t('auctions.columns.time_left') }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/dashboard-bg.webp)' }}
      />
      
      {/* Content with Glassmorphism */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Admin View */}
        {viewMode === 'admin' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <PiChartLineUpBold className="h-5 w-5 text-primary" />
                {t('dashboard.sections.revenue_chart')}
              </h3>
              {chartData && <DataChart data={chartData} type="line" />}
            </div>
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <PiCarFill className="h-5 w-5 text-primary" />
                {t('dashboard.sections.latest_quotes')}
              </h3>
              <DataTable
                data={latestQuotes}
                columns={quoteColumns}
                searchPlaceholder={t('quotes.search')}
                searchColumn="vehicle"
              />
            </div>
          </div>
        )}

        {/* Dealer View */}
        {viewMode === 'dealer' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <PiHandshakeFill className="h-5 w-5 text-primary" />
                {t('dashboard.sections.active_auctions')}
              </h3>
              <DataTable
                data={latestAuctions}
                columns={auctionColumns}
                searchPlaceholder={t('auctions.search')}
                searchColumn="vehicle"
              />
            </div>
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <PiChartBarBold className="h-5 w-5 text-primary" />
                {t('dashboard.sections.performance')}
              </h3>
              {chartData && <DataChart data={chartData} type="bar" />}
            </div>
          </div>
        )}

        {/* User View */}
        {viewMode === 'user' && user && (
          <UserDashboard user={user} />
        )}
      </div>
    </div>
  );
}
