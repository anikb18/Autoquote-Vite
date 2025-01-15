import { quoteService } from '@/lib/quote-service';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

interface ActiveQuotesProps {
  dealerId: string;
}

export async function ActiveQuotes({ dealerId }: ActiveQuotesProps) {
  const t = await getTranslations('Dashboard');
  const quotes = await quoteService.getDealerQuotesOptimized(dealerId);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {t('activeQuoteRequests')}
        </h3>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('vehicle')}
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('timeRemaining')}
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('tradeIn')}
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('action')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => {
                const expiresAt = new Date(quote.expiresAt);
                const now = new Date();
                const hoursRemaining = Math.max(
                  0,
                  Math.round((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60))
                );

                return (
                  <tr key={quote.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.vehicleDetails.year} {quote.vehicleDetails.make}{' '}
                      {quote.vehicleDetails.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hoursRemaining > 0 ? (
                        <span className="text-green-600">
                          {hoursRemaining}h {t('remaining')}
                        </span>
                      ) : (
                        <span className="text-red-600">{t('expired')}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.tradeIn ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {t('yes')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {t('no')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {hoursRemaining > 0 && !quote.bids.some(bid => bid.dealerId === dealerId) && (
                        <Button
                          variant="default"
                          size="sm"
                          className="ml-3"
                        >
                          {t('submitBid')}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-3"
                      >
                        {t('viewDetails')}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
