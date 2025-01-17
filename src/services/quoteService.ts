// src/services/quoteService.ts
import { supabase } from '@/lib/supabase';
import { Quote, DealerQuote, Deadline } from '@/types/quotes';

export const quoteService = {
  // Create a new quote request
  async createQuoteRequest(userId: string, vehicleDetails: Quote['vehicle_details']) {
    // Start a transaction
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        user_id: userId,
        vehicle_details: vehicleDetails,
        status: 'pending',
      })
      .select()
      .single();

    if (quoteError) throw quoteError;

    // Set deadline (24 hours from now)
    const deadlineTime = new Date();
    deadlineTime.setHours(deadlineTime.getHours() + 24);

    const { error: deadlineError } = await supabase
      .from('deadline')
      .insert({
        quote_id: quote.id,
        deadline_time: deadlineTime.toISOString(),
        status: 'active',
      });

    if (deadlineError) throw deadlineError;

    return quote;
  },

  // Get quotes for a dealer
  async getDealerQuotes(dealerId: string) {
    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        dealer_quotes!inner(*),
        deadline(*)
      `)
      .eq('dealer_quotes.dealer_id', dealerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Submit a quote as a dealer
  async submitDealerQuote(dealerId: string, quoteId: string, price: number) {
    const { data, error } = await supabase
      .from('dealer_quotes')
      .insert({
        dealer_id: dealerId,
        quote_id: quoteId,
        price: price,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get the best 3 quotes for a specific quote request
  async getBestQuotes(quoteId: string) {
    const { data, error } = await supabase
      .from('dealer_quotes')
      .select(`
        *,
        dealer_profiles(*)
      `)
      .eq('quote_id', quoteId)
      .eq('status', 'pending')
      .order('price', { ascending: true })
      .limit(3);

    if (error) throw error;
    return data;
  },

  // Check and update expired quotes
  async checkExpiredQuotes() {
    const now = new Date().toISOString();

    // Get expired deadlines
    const { data: expiredDeadlines, error: deadlineError } = await supabase
      .from('deadline')
      .select('quote_id')
      .eq('status', 'active')
      .lt('deadline_time', now);

    if (deadlineError) throw deadlineError;

    if (expiredDeadlines?.length) {
      const expiredQuoteIds = expiredDeadlines.map(d => d.quote_id);

      // Update quotes status
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ status: 'expired' })
        .in('id', expiredQuoteIds);

      if (updateError) throw updateError;

      // Update deadline status
      const { error: deadlineUpdateError } = await supabase
        .from('deadline')
        .update({ status: 'expired' })
        .in('quote_id', expiredQuoteIds);

      if (deadlineUpdateError) throw deadlineUpdateError;
    }
  }
};