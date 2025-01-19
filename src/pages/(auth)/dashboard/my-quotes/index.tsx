import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { PlusIcon, CarFront, DollarSign, MessageSquare, Clock } from 'lucide-react';

interface Quote {
  id: string;
  vehicle: {
    make: string;
    model: string;
    year: string;
    type: string;
  };
  status: 'pending' | 'active' | 'expired' | 'completed';
  createdAt: string;
  expiresAt: string;
  dealerQuotes: {
    dealerName: string;
    price: number;
    isLowest: boolean;
    hasMessage: boolean;
    submittedAt: string;
  }[];
}

export default function MyQuotesPage() {
  const { t } = useTranslation();

  const quotes: Quote[] = [
    {
      id: '1',
      vehicle: {
        make: 'Toyota',
        model: 'RAV4',
        year: '2024',
        type: 'SUV',
      },
      status: 'active',
      createdAt: '2024-01-14T12:00:00',
      expiresAt: '2024-01-21T12:00:00',
      dealerQuotes: [
        {
          dealerName: 'Toyota Montreal',
          price: 35000,
          isLowest: true,
          hasMessage: true,
          submittedAt: '2024-01-14T14:00:00',
        },
        {
          dealerName: 'Toyota Laval',
          price: 36500,
          isLowest: false,
          hasMessage: false,
          submittedAt: '2024-01-14T15:00:00',
        },
      ],
    },
    {
      id: '2',
      vehicle: {
        make: 'Honda',
        model: 'CR-V',
        year: '2024',
        type: 'SUV',
      },
      status: 'pending',
      createdAt: '2024-01-14T10:00:00',
      expiresAt: '2024-01-21T10:00:00',
      dealerQuotes: [],
    },
  ];

  const renderQuoteCard = (quote: Quote) => {
    const lowestQuote = quote.dealerQuotes.find(q => q.isLowest);
    const timeLeft = new Date(quote.expiresAt).getTime() - new Date().getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    return (
      <Card key={quote.id} className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              {quote.vehicle.year} {quote.vehicle.make} {quote.vehicle.model}
            </CardTitle>
            <CardDescription>
              {t('myQuotes.requestedOn', {
                date: new Intl.DateTimeFormat('fr-CA').format(new Date(quote.createdAt)),
              })}
            </CardDescription>
          </div>
          <Badge
            variant={
              quote.status === 'active' ? 'success' :
              quote.status === 'pending' ? 'warning' :
              quote.status === 'expired' ? 'destructive' : 'secondary'
            }
          >
            {t(`myQuotes.status.${quote.status}`)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CarFront className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{quote.vehicle.type}</span>
            </div>
            {lowestQuote && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {t('myQuotes.lowestQuote', {
                    price: new Intl.NumberFormat('fr-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    }).format(lowestQuote.price),
                  })}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {t('myQuotes.responses', {
                  count: quote.dealerQuotes.length,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {daysLeft > 0 ? t('myQuotes.daysLeft', { days: daysLeft }) : t('myQuotes.expired')}
              </span>
            </div>
          </div>

          {quote.dealerQuotes.length > 0 ? (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">{t('myQuotes.dealerQuotes')}</h4>
              <div className="divide-y divide-gray-200">
                {quote.dealerQuotes.map((dealerQuote) => (
                  <div key={dealerQuote.dealerName} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{dealerQuote.dealerName}</p>
                      <p className="text-sm text-gray-500">
                        {t('myQuotes.submittedOn', {
                          date: new Intl.DateTimeFormat('fr-CA', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          }).format(new Date(dealerQuote.submittedAt)),
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-medium text-gray-900">
                        {new Intl.NumberFormat('fr-CA', {
                          style: 'currency',
                          currency: 'CAD',
                        }).format(dealerQuote.price)}
                      </span>
                      {dealerQuote.isLowest && (
                        <Badge variant="success" className="ml-2">
                          {t('myQuotes.lowestPrice')}
                        </Badge>
                      )}
                      <Button variant="outline">
                        {t('myQuotes.actions.viewDetails')}
                      </Button>
                      {dealerQuote.hasMessage && (
                        <Button>
                          {t('myQuotes.actions.viewMessage')}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">{t('myQuotes.noQuotesYet')}</p>
              <p className="text-xs text-gray-400 mt-1">{t('myQuotes.waitingForDealers')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('myQuotes.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('myQuotes.description')}
          </p>
        </div>
        <Link to="/dashboard/request-quote">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('myQuotes.actions.requestQuote')}
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            {t('myQuotes.tabs.active')}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t('myQuotes.tabs.completed')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {quotes.filter(q => ['active', 'pending'].includes(q.status)).map(renderQuoteCard)}
        </TabsContent>

        <TabsContent value="completed">
          {quotes.filter(q => ['completed', 'expired'].includes(q.status)).map(renderQuoteCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
