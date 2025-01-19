import { useTranslation } from 'react-i18next';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export default function TeamPage() {
  const { t } = useTranslation();

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: 'name',
      header: t('team.columns.name'),
    },
    {
      accessorKey: 'role',
      header: t('team.columns.role'),
    },
    {
      accessorKey: 'email',
      header: t('team.columns.email'),
    },
    {
      accessorKey: 'phone',
      header: t('team.columns.phone'),
    },
    {
      accessorKey: 'status',
      header: t('team.columns.status'),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {t(`team.status.${status}`)}
          </span>
        );
      },
    },
    {
      accessorKey: 'lastActive',
      header: t('team.columns.lastActive'),
      cell: ({ row }) => {
        const date = new Date(row.getValue('lastActive'));
        return new Intl.DateTimeFormat('fr-CA', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(date);
      },
    },
  ];

  // Sample data - in a real app, this would come from an API
  const data: TeamMember[] = [
    {
      id: '1',
      name: 'Jean Tremblay',
      role: t('team.roles.salesManager'),
      email: 'jean.tremblay@example.com',
      phone: '(514) 555-0123',
      status: 'active',
      lastActive: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Marie Dubois',
      role: t('team.roles.salesRep'),
      email: 'marie.dubois@example.com',
      phone: '(514) 555-0124',
      status: 'active',
      lastActive: new Date().toISOString(),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t('team.title')}
        </h1>
        <Button asChild>
          <Link to="/dashboard/team/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            {t('team.actions.addMember')}
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder={t('team.search')}
        searchColumn="name"
      />
    </div>
  );
}
