import { dealerPerformanceService } from '@/lib/dealer-performance';
import { getTranslations } from 'next-intl/server';

interface PerformanceMetricsProps {
  dealerId: string;
}

export async function PerformanceMetrics({ dealerId }: PerformanceMetricsProps) {
  const t = await getTranslations('Dashboard');
  const report = await dealerPerformanceService.getDealerPerformanceReport(dealerId);

  const metrics = [
    {
      name: t('responseTime'),
      score: report.score.metrics.responseTimeScore,
      description: t('responseTimeDescription'),
    },
    {
      name: t('acceptanceRate'),
      score: report.score.metrics.acceptanceRateScore,
      description: t('acceptanceRateDescription'),
    },
    {
      name: t('competitiveness'),
      score: report.score.metrics.competitivenessScore,
      description: t('competitivenessDescription'),
    },
    {
      name: t('reliability'),
      score: report.score.metrics.reliabilityScore,
      description: t('reliabilityDescription'),
    },
    {
      name: t('customerRating'),
      score: report.score.metrics.customerScore,
      description: t('customerRatingDescription'),
    },
  ];

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
              {Math.round(report.score.totalScore)}
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

        {report.recommendations.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              {t('recommendations')}
            </h4>
            <ul className="space-y-2">
              {report.recommendations.map((recommendation, index) => (
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
