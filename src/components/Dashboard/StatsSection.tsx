'use client';

import { useTranslations } from 'next-intl';
import { Text } from '@/components/Catalyst/text';
import { Card } from '@/components/Catalyst/card';
import { Link } from '@/components/Catalyst/link';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  translations: {
    active_quotes: string;
    average_quote: string;
    potential_savings: string;
    dealer_responses: string;
  };
  locale: string;
}

export function StatsSection({ translations, locale }: StatsSectionProps) {
  // Format currency consistently between server and client
  const formatNumber = (value: number) => {
    return value.toLocaleString('en-CA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const stats = [
    {
      name: translations.active_quotes,
      value: '3',
      change: { value: '+2.1%', type: 'positive' as const },
    },
    {
      name: translations.average_quote,
      value: `$${formatNumber(28500)}`,
      change: { value: '-3.2%', type: 'negative' as const },
    },
    {
      name: translations.potential_savings,
      value: `$${formatNumber(4200)}`,
      change: { value: '+4.3%', type: 'positive' as const },
    },
    {
      name: translations.dealer_responses,
      value: '12',
      change: { value: '+12.3%', type: 'positive' as const },
    },
  ];

  return (
    <dl className="grid grid-cols-1 gap-px rounded-lg bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <Text as="dt" className="text-sm font-medium text-gray-500">
            {stat.name}
          </Text>
          <div className="flex items-baseline gap-x-2">
            <Text as="dd" className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </Text>
            <Text
              as="dd"
              className={cn(
                'text-xs font-medium',
                stat.change.type === 'positive' ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {stat.change.value}
            </Text>
          </div>
        </div>
      ))}
    </dl>
  );
}
