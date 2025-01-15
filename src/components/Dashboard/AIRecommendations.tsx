'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { StackedLayout } from '@/components/Catalyst/stacked-layout';
import { Text } from '@/components/Catalyst/text';
import { getVehicleRecommendations } from '@/lib/ai-service';
import { Vehicle } from '@/types/vehicle';
import { UserPreferences } from '@/types/user';
import { Sparkles } from 'lucide-react';

interface AIRecommendationsProps {
  userId: string;
}

// Default preferences to use if none exist
const defaultPreferences: UserPreferences = {
  type: 'SUV',
  budget: 35000,
  features: ['Safety', 'Fuel Efficiency'],
  usage: 'Family',
};

// Mock vehicles for development/fallback
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    year: 2024,
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    price: 32999,
    mpg: 41,
    features: ['Safety Sense 3.0', 'AWD', 'Apple CarPlay'],
    rating: 4.8
  },
  {
    id: '2',
    year: 2024,
    make: 'Honda',
    model: 'CR-V Hybrid',
    price: 33990,
    mpg: 40,
    features: ['Honda Sensing', 'AWD', 'Wireless CarPlay'],
    rating: 4.7
  }
];

export function AIRecommendations({ userId }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('Dashboard.components.ai_recommendations');
  const commonT = useTranslations('common');
  const currencyT = useTranslations('common.currency');

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const data = await getVehicleRecommendations(userId, defaultPreferences);
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [userId]);

  if (loading) {
    return (
      <StackedLayout>
        <Text>{commonT('loading')}</Text>
      </StackedLayout>
    );
  }

  return (
    <StackedLayout>
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <Text variant="h3">{t('title')}</Text>
      </div>
      
      {recommendations.length === 0 ? (
        <Text className="text-gray-500">{t('no_recommendations')}</Text>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {recommendations.map((vehicle) => (
            <div
              key={vehicle.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <Text variant="h4">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </Text>
              <Text className="text-primary font-semibold mt-2">
                {currencyT('format', { 
                  value: vehicle.price,
                  currency: 'CAD'
                })}
              </Text>
              <div className="mt-2 space-y-1">
                <Text variant="small" className="text-gray-600">
                  {t('mpg', { value: vehicle.mpg })}
                </Text>
                <Text variant="small" className="text-gray-600">
                  {t('rating', { value: vehicle.rating })}
                </Text>
                <div className="flex flex-wrap gap-2 mt-2">
                  {vehicle.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </StackedLayout>
  );
}
