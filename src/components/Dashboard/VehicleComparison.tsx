'use client';

import { useState } from 'react';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mpg: number;
  features: string[];
  rating: number;
}

interface VehicleComparisonTranslations {
  title: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mpg: string;
  features: string;
  rating: string;
  no_vehicles: string;
  select_vehicle: string;
}

interface VehicleComparisonProps {
  vehicles: Vehicle[];
  translations: VehicleComparisonTranslations;
}

// Move formatters outside component to ensure consistent rendering
const formatCurrency = (value: number, locale: string = 'en-US') => {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatFeatures = (features: string[]) => features.join(', ');

const formatRating = (rating: number) => `${rating}/5`;

export function VehicleComparison({ vehicles = [], translations }: VehicleComparisonProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Add defensive check for translations
  if (!translations) {
    console.error('Missing required translations for VehicleComparison');
    return null;
  }

  const columns = [
    { key: 'make', label: translations.make, format: (v: string) => v },
    { key: 'model', label: translations.model, format: (v: string) => v },
    { key: 'year', label: translations.year, format: (v: number) => v.toString() },
    { key: 'price', label: translations.price, format: (v: number) => formatCurrency(v) },
    { key: 'mpg', label: translations.mpg, format: (v: number) => v.toString() },
    { key: 'features', label: translations.features, format: formatFeatures },
    { key: 'rating', label: translations.rating, format: formatRating }
  ];

  return (
    <DashboardCard title={translations.title}>
      <div className="mt-4">
        {vehicles.length === 0 ? (
          <p className="text-sm text-gray-500">{translations.no_vehicles}</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow 
                    key={vehicle.id}
                    className={selectedVehicle?.id === vehicle.id ? 'bg-blue-50' : 'hover:bg-gray-50'}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    {columns.map((column) => (
                      <TableCell key={`${vehicle.id}-${column.key}`}>
                        {column.format(vehicle[column.key as keyof Vehicle])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
