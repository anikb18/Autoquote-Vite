'use client';

import { DashboardCard } from '@/components/shared/DashboardCard';
import { Button } from '@/components/ui/button';
import { CarIcon } from 'lucide-react';
import Link from 'next/link';

interface TradeInTranslations {
  title: string;
  getEstimate: string;
  noTradeIn: string;
  startTradeIn: string;
  vehicleDetails: {
    make: string;
    model: string;
    year: string;
    mileage: string;
    condition: string;
  };
  estimatedValue: string;
  status: {
    pending: string;
    approved: string;
    rejected: string;
  };
  current_value: string;
  last_update: string;
  market_insight: string;
  value_increased: string;
  view_history: string;
  trade_in: string;
}

interface TradeInCardProps {
  userId: string;
  translations: TradeInTranslations;
}

export function TradeInCard({ userId, translations }: TradeInCardProps) {
  // Mock data - replace with real API call
  const mockTradeIn = {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: 50000,
    estimatedValue: 28500,
  };

  return (
    <DashboardCard>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CarIcon className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">{translations.trade_in}</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-4"
            asChild
          >
            <Link href="/trade-in/new">
              {translations.getEstimate}
            </Link>
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{translations.current_value}</span>
            <span className="font-medium">${mockTradeIn.estimatedValue.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{translations.last_update}</span>
            <span className="text-gray-500">2 days ago</span>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-sm text-blue-700">
              {translations.market_insight}
            </h4>
            <p className="mt-1 text-sm text-blue-600">
              {translations.value_increased}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/trade-in/history">
              {translations.view_history}
            </Link>
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
}
