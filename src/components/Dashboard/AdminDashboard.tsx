'use client';

import { useRoleAccess } from '@/hooks/useRoleAccess';
import { useTranslations } from 'next-intl';

export default function AdminDashboard() {
  const t = useTranslations('dashboard');
  const { isAdmin } = useRoleAccess();

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900">{t('admin.welcome')}</h1>
        
        {/* Platform Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t('admin.stats.totalUsers')}
            value="1,234"
            change="+12"
            type="positive"
          />
          <StatCard
            title={t('admin.stats.totalDealers')}
            value="56"
            change="+3"
            type="positive"
          />
          <StatCard
            title={t('admin.stats.activeQuotes')}
            value="789"
            change="+25"
            type="positive"
          />
          <StatCard
            title={t('admin.stats.revenue')}
            value="$123,456"
            change="+18"
            type="positive"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            title={t('admin.actions.users')}
            description={t('admin.actions.usersDesc')}
            icon="👥"
            href="/admin/users"
          />
          <QuickAction
            title={t('admin.actions.dealers')}
            description={t('admin.actions.dealersDesc')}
            icon="🏢"
            href="/admin/dealers"
          />
          <QuickAction
            title={t('admin.actions.disputes')}
            description={t('admin.actions.disputesDesc')}
            icon="⚖️"
            href="/admin/disputes"
          />
          <QuickAction
            title={t('admin.actions.settings')}
            description={t('admin.actions.settingsDesc')}
            icon="⚙️"
            href="/admin/settings"
          />
        </div>

        {/* System Status */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">{t('admin.systemStatus')}</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatusCard
              title={t('admin.status.server')}
              status="healthy"
              metric="99.99%"
              description={t('admin.status.serverDesc')}
            />
            <StatusCard
              title={t('admin.status.database')}
              status="healthy"
              metric="45ms"
              description={t('admin.status.databaseDesc')}
            />
            <StatusCard
              title={t('admin.status.cache')}
              status="warning"
              metric="85%"
              description={t('admin.status.cacheDesc')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, type }: {
  title: string;
  value: string;
  change: string;
  type: 'positive' | 'negative';
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#446df6]/5 to-transparent" />
      <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`text-sm font-medium ${
          type === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}%
        </p>
      </dd>
    </div>
  );
}

function QuickAction({ title, description, icon, href }: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="relative group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center">
        <span className="text-3xl mr-4">{icon}</span>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </a>
  );
}

function StatusCard({ title, status, metric, description }: {
  title: string;
  status: 'healthy' | 'warning' | 'error';
  metric: string;
  description: string;
}) {
  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center">
        <div className={`h-3 w-3 rounded-full ${statusColors[status]} mr-3`} />
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{metric}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
