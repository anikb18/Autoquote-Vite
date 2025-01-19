import { supabase } from '@/lib/supabase'; // Import Supabase client

interface DealerPerformanceReport {
  stats: {
    totalQuotes: number;
    acceptedQuotes: number;
    averageResponseTime: number;
  };
  ranking: number;
}

/**
 * Fetches dealer performance data from the backend or Supabase.
 * @param dealerId - The ID of the dealer.
 * @returns A promise resolving to the dealer performance report.
 */
export const dealerPerformanceService = {
  async getDealerPerformanceReport(dealerId: string): Promise<DealerPerformanceReport> {
    try {
      // Fetch total quotes
      const { data: totalQuotesData, error: totalQuotesError } = await supabase
        .from('quotes')
        .select('*')
        .eq('dealer_id', dealerId);

      if (totalQuotesError) throw new Error('Failed to fetch total quotes');

      // Fetch accepted quotes
      const { data: acceptedQuotesData, error: acceptedQuotesError } = await supabase
        .from('quotes')
        .select('*')
        .eq('dealer_id', dealerId)
        .eq('status', 'accepted');

      if (acceptedQuotesError) throw new Error('Failed to fetch accepted quotes');

      // Fetch average response time
      const { data: responseTimesData, error: responseTimesError } = await supabase
        .from('quotes')
        .select('response_time')
        .eq('dealer_id', dealerId)
        .not('response_time', 'is', null);

      if (responseTimesError) throw new Error('Failed to fetch response times');

      // Calculate average response time
      const totalResponseTime = responseTimesData.reduce(
        (sum, quote) => sum + (quote.response_time || 0),
        0
      );
      const averageResponseTime =
        responseTimesData.length > 0 ? totalResponseTime / responseTimesData.length : 0;

      // Fetch ranking (example: rank based on accepted quotes)
      const { data: rankingData, error: rankingError } = await supabase
        .from('dealers')
        .select('ranking')
        .eq('id', dealerId)
        .single();

      if (rankingError) throw new Error('Failed to fetch ranking');

      return {
        stats: {
          totalQuotes: totalQuotesData?.length || 0,
          acceptedQuotes: acceptedQuotesData?.length || 0,
          averageResponseTime,
        },
        ranking: rankingData?.ranking || 0,
      };
    } catch (error) {
      console.error('Error fetching dealer performance report:', error);
      throw error;
    }
  },
};