'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { StatsSection } from '@/components/Dashboard/StatsSection';
import { AIRecommendations } from '@/components/Dashboard/AIRecommendations';
import { RecentActivityCard } from '@/components/Dashboard/RecentActivityCard';
import { QuoteRequestsCard } from '@/components/Dashboard/QuoteRequestsCard';
import { TradeInCard } from '@/components/Dashboard/TradeInCard';
import { Container } from '@/components/Catalyst/layout/containers/constrained_with_padded_content';
import { Button } from '@/components/Catalyst/button';
import { useRoleAccess } from '@/hooks/useRoleAccess';

interface SerializedUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | undefined;
  imageUrl: string;
}

interface DashboardContentProps {
  user: SerializedUser;
  translations: {
    welcome_buyer: string;
    welcome_dealer: string;
    stats_title: string;
    stats_quotes: string;
    stats_trades: string;
    stats_saved: string;
    ai_recommendations_title: string;
    ai_recommendations_none: string;
    recent_activity_title: string;
    recent_activity_none: string;
    quote_requests_title: string;
    quote_requests_none: string;
    trade_in_title: string;
    trade_in_none: string;
  };
}

export function DashboardContent({ user, translations }: DashboardContentProps) {
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const commonT = useTranslations('common');
  const { role } = useRoleAccess();

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold">
            {role === 'dealer' 
              ? translations.welcome_dealer
              : role === 'admin'
              ? t('welcomeAdmin', { name: user.firstName || commonT('guest') })
              : translations.welcome_buyer
            }
          </h1>
          <p className="text-gray-600">{t(`subtitle.${role}`)}</p>
        </div>

        <StatsSection 
          stats={
            role === 'dealer' 
              ? {
                  activeQuotes: t('stats.dealer.active_quotes'),
                  wonBids: t('stats.dealer.won_bids'),
                  conversionRate: t('stats.dealer.conversion_rate'),
                  revenue: t('stats.dealer.revenue')
                }
              : role === 'admin'
              ? {
                  totalUsers: t('stats.admin.total_users'),
                  totalDealers: t('stats.admin.total_dealers'),
                  platformRevenue: t('stats.admin.platform_revenue'),
                  activeQuotes: t('stats.admin.active_quotes')
                }
              : {
                  activeQuotes: t('stats.user.active_quotes'),
                  averageQuote: t('stats.user.average_quote'),
                  potentialSavings: t('stats.user.potential_savings'),
                  dealerResponses: t('stats.user.dealer_responses')
                }
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {role === 'dealer' ? (
            <>
              <QuoteRequestsCard 
                translations={{
                  title: t('components.dealer.quote_requests.title'),
                  newQuote: t('components.dealer.quote_requests.new_quote'),
                  noQuotes: t('components.dealer.quote_requests.no_quotes'),
                  startQuote: t('components.dealer.quote_requests.start_quote'),
                  status: {
                    pending: t('components.dealer.quote_requests.status.pending'),
                    active: t('components.dealer.quote_requests.status.active'),
                    completed: t('components.dealer.quote_requests.status.completed'),
                    expired: t('components.dealer.quote_requests.status.expired')
                  }
                }}
                isDealerView={true}
              />
              <div className="space-y-6">
                <Button 
                  onClick={() => router.push('/dealer/inventory')}
                  variant="primary"
                  className="w-full"
                >
                  {t('components.dealer.manage_inventory')}
                </Button>
                <Button 
                  onClick={() => router.push('/dealer/analytics')}
                  variant="secondary"
                  className="w-full"
                >
                  {t('components.dealer.view_analytics')}
                </Button>
              </div>
            </>
          ) : role === 'admin' ? (
            <>
              <div className="space-y-6">
                <Button 
                  onClick={() => router.push('/admin/users')}
                  variant="primary"
                  className="w-full"
                >
                  {t('components.admin.manage_users')}
                </Button>
                <Button 
                  onClick={() => router.push('/admin/dealers')}
                  variant="secondary"
                  className="w-full"
                >
                  {t('components.admin.manage_dealers')}
                </Button>
              </div>
              <div className="space-y-6">
                <Button 
                  onClick={() => router.push('/admin/settings')}
                  variant="primary"
                  className="w-full"
                >
                  {t('components.admin.platform_settings')}
                </Button>
                <Button 
                  onClick={() => router.push('/admin/analytics')}
                  variant="secondary"
                  className="w-full"
                >
                  {t('components.admin.platform_analytics')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <QuoteRequestsCard 
                translations={{
                  title: translations.quote_requests_title,
                  noQuotes: translations.quote_requests_none,
                  startQuote: t('components.quote_requests.start_quote'),
                  status: {
                    pending: t('components.quote_requests.status.pending'),
                    active: t('components.quote_requests.status.active'),
                    completed: t('components.quote_requests.status.completed'),
                    expired: t('components.quote_requests.status.expired')
                  }
                }}
              />
              <TradeInCard 
                translations={{
                  title: translations.trade_in_title,
                  noTradeIn: translations.trade_in_none,
                  getEstimate: t('components.trade_in.get_estimate')
                }}
              />
            </>
          )}
        </div>

        {role !== 'admin' && (
          <AIRecommendations 
            userId={user.id}
            translations={{
              title: translations.ai_recommendations_title,
              noRecommendations: translations.ai_recommendations_none
            }}
          />
        )}

        <RecentActivityCard 
          translations={{
            title: translations.recent_activity_title,
            noActivity: translations.recent_activity_none,
            viewAll: t(`components.${role}.recent_activity.view_all`)
          }}
        />
      </div>
    </Container>
  );
}
