import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Quote {
  id: string;
  customerName: string;
  make: string;
  model: string;
  year: string;
  price: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export default function QuotesPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  const columns: ColumnDef<Quote>[] = [
    {
      accessorKey: 'customerName',
      header: t('quotes.columns.customer'),
    },
    {
      accessorKey: 'make',
      header: t('quotes.columns.make'),
    },
    {
      accessorKey: 'model',
      header: t('quotes.columns.model'),
    },
    {
      accessorKey: 'year',
      header: t('quotes.columns.year'),
    },
    {
      accessorKey: 'price',
      header: t('quotes.columns.price'),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        return new Intl.NumberFormat('fr-CA', {
          style: 'currency',
          currency: 'CAD',
        }).format(price);
      },
    },
    {
      accessorKey: 'status',
      header: t('quotes.columns.status'),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
              ${status === 'accepted' ? 'bg-green-100 text-green-800' : 
                status === 'rejected' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const data: Quote[] = [
    {
      id: '1',
      customerName: 'Jean Tremblay',
      make: 'Toyota',
      model: 'RAV4',
      year: '2024',
      price: '35000',
      status: 'pending',
      createdAt: '2024-01-14',
    },
    {
      id: '2',
      customerName: 'Marie Dubois',
      make: 'Honda',
      model: 'CR-V',
      year: '2024',
      price: '38000',
      status: 'accepted',
      createdAt: '2024-01-13',
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('quotes.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('quotes.description')}
          </p>
        </div>
        {viewMode !== 'user' && (
          <Link to="/dashboard/quotes/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              {t('quotes.actions.new')}
            </Button>
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
