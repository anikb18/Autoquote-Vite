import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Dashboard from './Dashboard';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function DashboardPage({ params: { locale } }: PageProps) {
  const user = await currentUser();
  setRequestLocale(locale);
  const t = await getTranslations('Dashboard');

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return (
    <Dashboard
      user={user}
      locale={locale}
      translations={{
        welcome_buyer: t('welcome_buyer'),
        dashboard_subtitle: t('dashboard_subtitle'),
        active_quotes: t('active_quotes'),
        average_quote: t('average_quote'),
        potential_savings: t('potential_savings'),
        dealer_responses: t('dealer_responses'),
        new_quote_request: t('new_quote_request'),
        trade_in_valuation: t('trade_in_valuation'),
        contact_support: t('contact_support'),
        components: {
          notifications: {
            title: t('components.notifications.title'),
            mark_all_read: t('components.notifications.mark_all_read'),
            no_notifications: t('components.notifications.no_notifications')
          },
          quote_requests: {
            title: t('components.quote_requests.title'),
            new_quote: t('components.quote_requests.new_quote'),
            no_quotes: t('components.quote_requests.no_quotes'),
            start_quote: t('components.quote_requests.start_quote'),
            status: {
              pending: t('components.quote_requests.status.pending'),
              active: t('components.quote_requests.status.active'),
              completed: t('components.quote_requests.status.completed'),
              expired: t('components.quote_requests.status.expired')
            }
          },
          trade_in: {
            title: t('components.trade_in.title'),
            get_estimate: t('components.trade_in.get_estimate'),
            no_trade_in: t('components.trade_in.no_trade_in'),
            start_trade_in: t('components.trade_in.start_trade_in'),
            vehicle_details: {
              make: t('components.trade_in.vehicle_details.make'),
              model: t('components.trade_in.vehicle_details.model'),
              year: t('components.trade_in.vehicle_details.year'),
              mileage: t('components.trade_in.vehicle_details.mileage'),
              condition: t('components.trade_in.vehicle_details.condition')
            },
            estimated_value: t('components.trade_in.estimated_value'),
            current_value: t('components.trade_in.current_value'),
            last_update: t('components.trade_in.last_update'),
            market_insight: t('components.trade_in.market_insight'),
            value_increased: t('components.trade_in.value_increased'),
            view_history: t('components.trade_in.view_history'),
            trade_in: t('components.trade_in.trade_in'),
            status: {
              pending: t('components.trade_in.status.pending'),
              approved: t('components.trade_in.status.approved'),
              rejected: t('components.trade_in.status.rejected')
            }
          }
        }
      }}
    />
  );
}
