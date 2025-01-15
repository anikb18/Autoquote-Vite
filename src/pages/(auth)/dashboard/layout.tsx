import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/hooks/useViewMode';
import { useAuth } from '@/providers/AuthProvider';
import { Sidebar } from '@/components/sidebar';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { Eye } from 'lucide-react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { viewMode } = useViewMode();
  const { user } = useAuth();
  const { t } = useTranslation();

  const translatedLabels = {
    newQuote: t('dashboard.navigation.newQuote'),
    activeQuotes: t('dashboard.navigation.activeQuotes'),
    quoteHistory: t('dashboard.navigation.quoteHistory'),
    tradeIns: t('dashboard.navigation.tradeIns'),
    settings: t('dashboard.navigation.settings'),
    darkMode: t('theme.darkMode'),
    lightMode: t('theme.lightMode'),
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar translatedLabels={translatedLabels} userRole={user?.role || 'user'} />
      
      <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out lg:pl-64">
        <div className="container mx-auto h-full max-w-7xl px-4 py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.title')}
            </h1>
            <div className="flex w-full items-center justify-end gap-4 sm:w-auto">
              <div className="flex items-center gap-2">
                <ViewSwitcher />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
            {children || <Outlet />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
