import { dealerPerformanceService } from '@/lib/dealer-performance';
import { getTranslations } from 'next-intl/server';

interface DealerStatsProps {
  dealerId: string;
}

export async function DealerStats({ dealerId }: DealerStatsProps) {
  const t = await getTranslations('Dashboard');
  const report = await dealerPerformanceService.getDealerPerformanceReport(dealerId);

  const stats = [
    {
      name: t('totalQuotes'),
      value: report.stats.totalQuotes,
      change: '+20%',
      changeType: 'positive',
    },
    {
      name: t('acceptanceRate'),
      value: `${((report.stats.acceptedQuotes / report.stats.totalQuotes) * 100).toFixed(1)}%`,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: t('avgResponseTime'),
      value: `${report.stats.averageResponseTime.toFixed(1)} ${t('minutes')}`,
      change: '-2.5%',
      changeType: 'positive',
    },
    {
      name: t('ranking'),
      value: `#${report.ranking}`,
      change: '+2',
      changeType: 'positive',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        {t('performanceOverview')}
      </h3>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                {/* Icon here */}
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
