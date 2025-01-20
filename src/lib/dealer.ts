// src/lib/dealer.ts
import { getSupabaseClient } from '@/lib/supabase';

interface DealerStats {
  active_quotes_count: number;
  quote_change: number;
  recent_quotes: any[];
  won_bids_count: number;
  total_revenue: number;
  subscription_type: string;
}

export const fetchDealerStats = async (dealerId: string): Promise<DealerStats> => {
  const supabase = getSupabaseClient();
  
  // First get dealer's subscription type
  const { data: dealer, error: dealerError } = await supabase
    .from('dealer_profiles')
    .select('subscription_type')
    .eq('id', dealerId)
    .single();

  if (dealerError) throw dealerError;

  // Then fetch stats based on subscription type
  const { data, error } = await supabase
    .rpc('get_dealer_stats', {
      p_dealer_id: dealerId,
      p_subscription_type: dealer.subscription_type
    });

  if (error) throw error;

  // Return formatted stats with defaults
  return {
    active_quotes_count: data?.active_quotes_count || 0,
    quote_change: data?.quote_change || 0,
    recent_quotes: data?.recent_quotes || [],
    won_bids_count: data?.won_bids_count || 0, 
    total_revenue: data?.total_revenue || 0,
    subscription_type: dealer.subscription_type
  };
};
