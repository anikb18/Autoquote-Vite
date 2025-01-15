import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { PlusIcon } from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  condition: 'new' | 'used';
  addedAt: string;
}

export default function InventoryPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: 'make',
      header: t('inventory.columns.make'),
    },
    {
      accessorKey: 'model',
      header: t('inventory.columns.model'),
    },
    {
      accessorKey: 'year',
      header: t('inventory.columns.year'),
    },
    {
      accessorKey: 'vin',
      header: t('inventory.columns.vin'),
    },
    {
      accessorKey: 'price',
      header: t('inventory.columns.price'),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'));
        return new Intl.NumberFormat('fr-CA', {
          style: 'currency',
          currency: 'CAD',
        }).format(amount);
      },
    },
    {
      accessorKey: 'status',
      header: t('inventory.columns.status'),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={
              status === 'available' ? 'success' :
              status === 'reserved' ? 'warning' : 'secondary'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'condition',
      header: t('inventory.columns.condition'),
      cell: ({ row }) => {
        const condition = row.getValue('condition') as string;
        return (
          <Badge variant="outline">
            {condition}
          </Badge>
        );
      },
    },
  ];

  const data: Vehicle[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'RAV4',
      year: '2024',
      vin: '1HGCM82633A123456',
      price: 35000,
      status: 'available',
      condition: 'new',
      addedAt: '2024-01-14',
    },
    {
      id: '2',
      make: 'Honda',
      model: 'CR-V',
      year: '2024',
      vin: '2HGFB2F54EH123456',
      price: 38000,
      status: 'reserved',
      condition: 'new',
      addedAt: '2024-01-13',
    },
  ];

  if (viewMode !== 'dealer') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">{t('common.unauthorized')}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('inventory.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('inventory.description')}
          </p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          {t('inventory.actions.add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('inventory.stats.total')}</CardTitle>
            <CardDescription>42 {t('inventory.stats.vehicles')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('inventory.stats.available')}</CardTitle>
            <CardDescription>35 {t('inventory.stats.vehicles')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('inventory.stats.reserved')}</CardTitle>
            <CardDescription>5 {t('inventory.stats.vehicles')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('inventory.stats.sold')}</CardTitle>
            <CardDescription>2 {t('inventory.stats.vehicles')}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('inventory.list.title')}</CardTitle>
          <CardDescription>{t('inventory.list.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
