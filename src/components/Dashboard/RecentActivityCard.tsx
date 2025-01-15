'use client';

import { StackedLayout } from '@/components/Catalyst/stacked-layout';
import { Button } from '@/components/Catalyst/button';
import { ClockIcon, CarIcon, DollarSignIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivityCardProps {
  userId: string;
  translations: {
    title: string;
    no_activity: string;
    view_all: string;
    activities: {
      quote: string;
      trade_in: string;
      payment: string;
    };
  };
}

interface Activity {
  id: string;
  type: 'quote' | 'trade_in' | 'payment';
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'quote',
    title: 'New Quote Request',
    description: '2024 Toyota RAV4 Hybrid',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'trade_in',
    title: 'Trade-in Value Updated',
    description: '2022 Honda Civic',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Quote Payment Processed',
    description: '$40.00',
    timestamp: '1 day ago'
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'quote':
      return <CarIcon className="h-4 w-4 text-blue-500" />;
    case 'trade_in':
      return <ClockIcon className="h-4 w-4 text-green-500" />;
    case 'payment':
      return <DollarSignIcon className="h-4 w-4 text-purple-500" />;
  }
};

export function RecentActivityCard({ userId, translations }: RecentActivityCardProps) {
  // Add defensive check for translations
  if (!translations?.activities) {
    console.error('Missing required translations for RecentActivityCard');
    return null;
  }

  return (
    <StackedLayout className="bg-white shadow-sm rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">{translations.title}</h3>
          <Link to="/activity" className="inline-block">
            <Button
              variant="ghost"
              size="sm"
            >
              {translations.view_all}
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {mockActivities.length === 0 ? (
            <p className="text-sm text-gray-500">{translations.no_activity}</p>
          ) : (
            mockActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4"
              >
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {translations.activities?.[activity.type] || activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap">
                  {activity.timestamp}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </StackedLayout>
  );
}
