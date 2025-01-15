'use client';

import { DashboardCard } from '@/components/shared/DashboardCard';
import { InteractiveChart } from '@/components/shared/InteractiveChart';
import { StatCard } from '@/components/shared/StatCard';

interface PriceHistoryTranslations {
  title: string;
  subtitle: string;
  currentPrice: string;
  marketAverage: string;
  priceRange: string;
  marketPrice: string;
  dealerPrice: string;
  priceHistorySubtitle: string;
  marketInsight: string;
  priceInsightMessage: string;
}

interface PriceHistoryProps {
  vehicleId: string;
  translations: PriceHistoryTranslations;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export function PriceHistory({ vehicleId, translations }: PriceHistoryProps) {
  // Mock data - replace with real API call
  const priceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: translations.marketPrice,
        data: [32000, 31500, 31800, 32200, 32100, 31900],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: translations.dealerPrice,
        data: [31500, 31000, 31200, 31800, 31600, 31400],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const stats = [
    {
      id: 'current-price',
      title: translations.currentPrice,
      value: '$31,400',
      change: { value: '-1.2%', type: 'negative' as const },
    },
    {
      id: 'market-average',
      title: translations.marketAverage,
      value: '$31,900',
      change: { value: '+0.5%', type: 'positive' as const },
    },
    {
      id: 'price-range',
      title: translations.priceRange,
      value: '$30,900 - $32,900',
      change: { value: '±3.2%', type: 'neutral' as const },
    },
  ];

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: number) => formatCurrency(value),
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = formatCurrency(context.parsed.y);
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <DashboardCard
      title={translations.title}
      subtitle={translations.priceHistorySubtitle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
            />
          ))}
        </div>

        <InteractiveChart
          type="line"
          data={priceData}
          height={300}
          options={chartOptions}
        />

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            {translations.marketInsight}
          </h4>
          <p className="text-sm text-blue-700">
            {translations.priceInsightMessage}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
