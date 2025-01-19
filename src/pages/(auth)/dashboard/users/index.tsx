import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserDashboard } from '@/components/Dashboard/UserDashboard'; // Import the UserDashboard component

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'dealer' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export default function UsersPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'email',
      header: t('users.columns.email'),
    },
    {
      accessorKey: 'name',
      header: t('users.columns.name'),
    },
    {
      accessorKey: 'role',
      header: t('users.columns.role'),
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        return (
          <span className="capitalize">{role}</span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: t('users.columns.status'),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
              ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: 'lastLogin',
      header: t('users.columns.lastLogin'),
      cell: ({ row }) => {
        const date = new Date(row.getValue('lastLogin'));
        return new Intl.DateTimeFormat('fr-CA').format(date);
      },
    },
  ];

  const data: User[] = [
    {
      id: '1',
      email: 'admin@autoquote24.com',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-14T12:00:00',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      email: 'dealer@toyotamontreal.com',
      name: 'Dealer User',
      role: 'dealer',
      status: 'active',
      lastLogin: '2024-01-14T10:00:00',
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
            {t('users.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('users.description')}
          </p>
        </div>
        <Link to="/dashboard/users/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('users.actions.add')}
          </Button>
        </Link>
      </div>

      {/* Replace the DataTable with UserDashboard */}
      <UserDashboard />
    </div>
  );
}