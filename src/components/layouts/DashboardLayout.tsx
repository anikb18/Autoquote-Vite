import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthProvider';
import { useViewMode } from '@/contexts/ViewModeContext';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { Link, useLocation } from 'react-router-dom';
import { SidebarLayout } from '@/components/Catalyst/sidebar-layout';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { navigation } from '@/contexts/navigation';
import { quickActions } from '@/contexts/quickActions';
import { UserDashboard } from '@/components/Dashboard/UserDashboard';
import { DealerDashboard } from '@/components/Dashboard/DealerDashboard';
import { AdminDashboard } from '@/components/Dashboard/AdminDashboard';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import cn from 'classnames';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const SUPER_ADMIN_EMAIL = 'anikbeauchemin18@gmail.com';

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.email) return;
      const hash = md5(user.email.toLowerCase().trim());
      const url = `https://www.gravatar.com/avatar/${hash}?d=404`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    fetchAvatar();
  }, [user?.email]);

  // Role checks
  const isAdmin = user?.user_metadata?.role === 'admin';
  const isDealer = user?.user_metadata?.role === 'dealer';
  const isUser = user?.user_metadata?.role === 'user';

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/dashboard-bg.webp)' }}
      />
      {/* Content */}
      <div className="relative z-10">
        <SidebarLayout>
          <SidebarLayout.Sidebar className="bg-white shadow-sm">
            <div className="flex h-full flex-col gap-y-5">
              <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
                <img className="h-8 w-auto" src="/dark.svg" alt="AutoQuote24" />
              </div>
              {/* Admin View Switcher */}
              {(isSuperAdmin || isAdmin) && (
                <div className="px-6 py-2">
                  <ViewSwitcher />
                </div>
              )}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  {/* Navigation items */}
                </ul>
              </nav>
            </div>
          </SidebarLayout.Sidebar>
          <SidebarLayout.Main className="flex-1 bg-transparent">
            {/* Render the appropriate dashboard based on user role */}
            {isAdmin && <AdminDashboard />}
            {isDealer && <DealerDashboard />}
            {isUser && <UserDashboard user={user} />}
            {children} {/* Render children if needed */}
          </SidebarLayout.Main>
        </SidebarLayout>
      </div>
    </div>
  );
}