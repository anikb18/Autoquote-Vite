import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export default function DealersPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  const columns: ColumnDef<Dealer>[] = [
    {
      accessorKey: 'name',
      header: t('dealers.columns.name'),
    },
    {
      accessorKey: 'email',
      header: t('dealers.columns.email'),
    },
    {
      accessorKey: 'phone',
      header: t('dealers.columns.phone'),
    },
    {
      accessorKey: 'city',
      header: t('dealers.columns.city'),
    },
    {
      accessorKey: 'status',
      header: t('dealers.columns.status'),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
              ${status === 'active' ? 'bg-green-100 text-green-800' : 
                status === 'inactive' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const data: Dealer[] = [
    {
      id: '1',
      name: 'Toyota Montreal',
      email: 'contact@toyotamontreal.com',
      phone: '514-555-0123',
      address: '123 Rue Principale',
      city: 'Montreal',
      status: 'active',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Honda Laval',
      email: 'info@hondalaval.com',
      phone: '450-555-0123',
      address: '456 Boulevard Principal',
      city: 'Laval',
      status: 'active',
      createdAt: '2024-01-02',
    },
  ];

  if (viewMode !== 'admin') {
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
            {t('dealers.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('dealers.description')}
          </p>
        </div>
        <Link to="/dashboard/dealers/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('dealers.actions.add')}
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
