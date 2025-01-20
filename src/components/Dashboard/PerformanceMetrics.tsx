import { fetchDealerStats } from '@/lib/dealer'; // Import the fetchDealerStats function
import { useTranslation } from 'react-i18next'; // Correct import
import { useEffect, useState } from 'react';

interface PerformanceMetricsProps {
  dealerId: string;
}

export function PerformanceMetrics({ dealerId }: PerformanceMetricsProps) {
  const { t } = useTranslation('Dashboard');
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchDealerStats(dealerId);
        const metricsData = [
          {
            name: t('responseTime'),
            score: stats.quote_change,
            description: t('responseTimeDescription'),
          },
          {
            name: t('acceptanceRate'),
            score: stats.acceptanceRate,
            description: t('acceptanceRateDescription'),
          },
          {
            name: t('competitiveness'),
            score: stats.competitiveness,
            description: t('competitivenessDescription'),
          },
          {
            name: t('reliability'),
            score: stats.reliability,
            description: t('reliabilityDescription'),
          },
          {
            name: t('customerRating'),
            score: stats.customerRating,
            description: t('customerRatingDescription'),
          },
        ];
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching dealer stats:', error);
        setError('Failed to fetch dealer stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dealerId, t]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('performanceMetrics')}
          </h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              {t('overallScore')}:
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {metrics.length > 0 ? Math.round(metrics[0].score) : 0}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {metric.name}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(metric.score)}%
                </span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${metric.score}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    metric.score >= 80
                      ? 'bg-green-500'
                      : metric.score >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {metrics.length > 0 && metrics[0].recommendations && metrics[0].recommendations.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              {t('recommendations')}
            </h4>
            <ul className="space-y-2">
              {metrics[0].recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <span className="text-blue-500 mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}