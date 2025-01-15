import { getTranslations } from 'next-intl/server';
import { dealerPerformanceService } from '@/lib/dealer-performance';
import { formatCurrency } from '@/utils/format';

interface MarketInsightsProps {
  dealerId: string;
}

export async function MarketInsights({ dealerId }: MarketInsightsProps) {
  const t = await getTranslations('Dashboard');
  const rankings = await dealerPerformanceService.getDealerRankings(5);
  const allStats = await dealerPerformanceService.getAllDealerStats();

  // Calculate market averages
  const marketAverages = {
    responseTime: allStats.reduce((sum, stat) => sum + stat.averageResponseTime, 0) / allStats.length,
    acceptanceRate: allStats.reduce((sum, stat) => sum + (stat.acceptedQuotes / stat.totalQuotes), 0) / allStats.length,
    bidAmount: allStats.reduce((sum, stat) => sum + stat.averageBidAmount, 0) / allStats.length,
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {t('marketInsights')}
        </h3>

        {/* Market Averages */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {t('marketAverages')}
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('avgResponseTime')}</span>
                <span className="font-medium">
                  {Math.round(marketAverages.responseTime)} {t('minutes')}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('avgAcceptanceRate')}</span>
                <span className="font-medium">
                  {(marketAverages.acceptanceRate * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('avgBidAmount')}</span>
                <span className="font-medium">
                  {formatCurrency(marketAverages.bidAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {t('topPerformers')}
          </h4>
          <div className="space-y-3">
            {rankings.map((ranking, index) => (
              <div
                key={ranking.dealerId}
                className={`flex items-center justify-between ${
                  ranking.dealerId === dealerId
                    ? 'bg-blue-50 p-2 rounded'
                    : ''
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      index === 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : index === 1
                        ? 'bg-gray-100 text-gray-800'
                        : index === 2
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    } text-sm font-medium`}
                  >
                    {index + 1}
                  </span>
                  <span className="ml-3 text-sm text-gray-900">
                    {ranking.dealerId === dealerId ? t('you') : `${t('dealer')} ${index + 1}`}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(ranking.score)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {t('marketTrends')}
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• {t('marketTrend1')}</p>
            <p>• {t('marketTrend2')}</p>
            <p>• {t('marketTrend3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
