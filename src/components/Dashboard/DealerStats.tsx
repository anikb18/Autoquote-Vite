import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dealerPerformanceService } from '@/lib/dealer-performance';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface DealerStatsProps {
  dealerId: string;
}

export function DealerStats({ dealerId }: DealerStatsProps) {
  const { t } = useTranslation('Dashboard');
  const [stats, setStats] = useState<
    { name: string; stat: string; change: string; changeType: 'positive' | 'negative' }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const report = await dealerPerformanceService.getDealerPerformanceReport(dealerId);

        const statsData = [
          {
            name: t('totalQuotes'),
            stat: report.stats.totalQuotes.toString(),
            change: '+20%',
            changeType: 'positive',
          },
          {
            name: t('acceptanceRate'),
            stat: `${((report.stats.acceptedQuotes / report.stats.totalQuotes) * 100).toFixed(1)}%`,
            change: '+4.75%',
            changeType: 'positive',
          },
          {
            name: t('avgResponseTime'),
            stat: `${report.stats.averageResponseTime.toFixed(1)} ${t('minutes')}`,
            change: '-2.5%',
            changeType: 'positive',
          },
          {
            name: t('ranking'),
            stat: `#${report.ranking}`,
            change: '+2',
            changeType: 'positive',
          },
        ];

        setStats(statsData);
      } catch (error) {
        console.error('Error fetching dealer stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dealerId, t]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {t('performanceOverview')}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 flex items-baseline">
              <span className="text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </span>
              <span
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.change}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}