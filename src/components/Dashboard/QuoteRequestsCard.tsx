'use client';

import { DashboardCard } from '@/components/shared/DashboardCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuoteRequestTranslations {
  title: string;
  new_quote: string;
  no_quotes: string;
  start_quote: string;
  status: {
    pending: string;
    active: string;
    completed: string;
    expired: string;
  };
}

interface QuoteRequestsCardProps {
  userId: string;
  translations: QuoteRequestTranslations;
}

export function QuoteRequestsCard({ userId, translations }: QuoteRequestsCardProps) {
  // Mock data - replace with real API call
  const mockQuotes = [
    {
      id: '1',
      vehicle: 'Toyota RAV4 2024',
      status: 'pending',
      date: '2024-01-05',
      responses: 2,
    },
    {
      id: '2',
      vehicle: 'Honda CR-V 2024',
      status: 'active',
      date: '2024-01-04',
      responses: 3,
    },
    {
      id: '3',
      vehicle: 'Mazda CX-5 2024',
      status: 'completed',
      date: '2024-01-03',
      responses: 4,
    },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'pending':
        return translations.status.pending;
      case 'active':
        return translations.status.active;
      case 'completed':
        return translations.status.completed;
      case 'expired':
        return translations.status.expired;
      default:
        return status;
    }
  };

  return (
    <DashboardCard>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{translations.title}</h3>
          <Button
            variant="outline"
            size="sm"
            className="ml-4"
          >
            {translations.new_quote}
          </Button>
        </div>

        {mockQuotes.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-gray-500">{translations.no_quotes}</p>
            <Button className="mt-4">
              {translations.start_quote}
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {mockQuotes.map((quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border"
              >
                <div>
                  <h4 className="font-medium">{quote.vehicle}</h4>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeColor(quote.status)}
                    >
                      {getStatusTranslation(quote.status)}
                    </Badge>
                    <span>{quote.date}</span>
                    <span>•</span>
                    <span>{quote.responses} responses</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
