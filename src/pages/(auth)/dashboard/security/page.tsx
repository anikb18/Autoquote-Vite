import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Catalyst/card";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  ip: string;
  timestamp: string;
}

export default function SecurityPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  const columns: ColumnDef<AuditLog>[] = [
    {
      accessorKey: 'action',
      header: t('security.columns.action'),
    },
    {
      accessorKey: 'user',
      header: t('security.columns.user'),
    },
    {
      accessorKey: 'ip',
      header: t('security.columns.ip'),
    },
    {
      accessorKey: 'timestamp',
      header: t('security.columns.timestamp'),
      cell: ({ row }) => {
        const date = new Date(row.getValue('timestamp'));
        return new Intl.DateTimeFormat('fr-CA', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }).format(date);
      },
    },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      action: 'Login attempt',
      user: 'admin@autoquote24.com',
      ip: '192.168.1.1',
      timestamp: '2024-01-14T12:00:00',
    },
    {
      id: '2',
      action: 'Password change',
      user: 'dealer@toyotamontreal.com',
      ip: '192.168.1.2',
      timestamp: '2024-01-14T11:30:00',
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
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('security.title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t('security.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('security.authentication.title')}</CardTitle>
            <CardDescription>
              {t('security.authentication.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('security.authentication.mfa')}</p>
                <p className="text-sm text-gray-500">
                  {t('security.authentication.mfaDescription')}
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('security.authentication.passwordPolicy')}</p>
                <p className="text-sm text-gray-500">
                  {t('security.authentication.passwordPolicyDescription')}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('security.sessions.title')}</CardTitle>
            <CardDescription>
              {t('security.sessions.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('security.sessions.current')}</p>
                <p className="text-sm text-gray-500">Montreal, Canada</p>
                <p className="text-xs text-gray-400">Last active: Just now</p>
              </div>
              <Button variant="outline">{t('security.sessions.terminate')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('security.auditLog.title')}</CardTitle>
          <CardDescription>
            {t('security.auditLog.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={auditLogs} />
        </CardContent>
      </Card>
    </div>
  );
}
