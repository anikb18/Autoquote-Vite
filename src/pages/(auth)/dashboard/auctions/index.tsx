import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

interface Auction {
  id: string;
  vehicle: string;
  startPrice: number;
  currentBid: number;
  bidders: number;
  status: 'active' | 'ended' | 'upcoming';
  endsAt: string;
}

export default function AuctionsPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  const columns: ColumnDef<Auction>[] = [
    {
      accessorKey: 'vehicle',
      header: t('auctions.columns.vehicle'),
    },
    {
      accessorKey: 'startPrice',
      header: t('auctions.columns.startPrice'),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('startPrice'));
        return new Intl.NumberFormat('fr-CA', {
          style: 'currency',
          currency: 'CAD',
        }).format(amount);
      },
    },
    {
      accessorKey: 'currentBid',
      header: t('auctions.columns.currentBid'),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('currentBid'));
        return new Intl.NumberFormat('fr-CA', {
          style: 'currency',
          currency: 'CAD',
        }).format(amount);
      },
    },
    {
      accessorKey: 'bidders',
      header: t('auctions.columns.bidders'),
    },
    {
      accessorKey: 'status',
      header: t('auctions.columns.status'),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={
              status === 'active' ? 'success' :
              status === 'upcoming' ? 'warning' : 'secondary'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'endsAt',
      header: t('auctions.columns.endsAt'),
      cell: ({ row }) => {
        const date = new Date(row.getValue('endsAt'));
        return new Intl.DateTimeFormat('fr-CA', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(date);
      },
    },
  ];

  const data: Auction[] = [
    {
      id: '1',
      vehicle: '2024 Toyota RAV4 XLE',
      startPrice: 35000,
      currentBid: 37500,
      bidders: 5,
      status: 'active',
      endsAt: '2024-01-15T14:00:00',
    },
    {
      id: '2',
      vehicle: '2024 Honda CR-V Touring',
      startPrice: 38000,
      currentBid: 38000,
      bidders: 0,
      status: 'upcoming',
      endsAt: '2024-01-16T10:00:00',
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
            {t('auctions.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('auctions.description')}
          </p>
        </div>
        <Button>
          {t('auctions.actions.create')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('auctions.stats.active')}</CardTitle>
            <CardDescription>5 {t('auctions.stats.auctions')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('auctions.stats.totalBids')}</CardTitle>
            <CardDescription>23 {t('auctions.stats.bids')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('auctions.stats.averageBid')}</CardTitle>
            <CardDescription>$37,850</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('auctions.list.title')}</CardTitle>
          <CardDescription>{t('auctions.list.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
