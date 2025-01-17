import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthProvider';
import { useViewMode } from '@/contexts/ViewModeContext';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { SidebarLayout } from '@/components/Catalyst/sidebar-layout';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import type { ViewMode } from '@/contexts/ViewModeContext';
import { 
  PiCarFill, 
  PiCurrencyDollarBold, 
  PiChatCircleTextFill,
  PiChartBarBold,
  PiUsersBold,
  PiGearFill,
  PiHouseBold,
  PiSignOutBold,
  PiHandshakeFill,
  PiStorefrontFill,
  PiBuildingsFill,
  PiUserGearFill,
  PiShieldCheckFill,
  PiChartLineUpBold,
  PiUsersThreeFill,
  PiClipboardTextFill
} from 'react-icons/pi';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import md5 from 'md5';
import cn from 'classnames';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const SUPER_ADMIN_EMAIL = 'anikbeauchemin18@gmail.com';

const navigation: Record<ViewMode, Array<{
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}>> = {
  admin: [
    { name: 'dashboard.nav.overview', href: '/dashboard', icon: PiChartBarBold },
    { name: 'dashboard.nav.dealers', href: '/dashboard/dealers', icon: PiStorefrontFill },
    { name: 'dashboard.nav.users', href: '/dashboard/users', icon: PiUsersBold },
    { name: 'dashboard.nav.quotes', href: '/dashboard/quotes', icon: PiClipboardTextFill },
    { name: 'dashboard.nav.analytics', href: '/dashboard/analytics', icon: PiChartLineUpBold },
  ],
  dealer: [
    { name: 'dashboard.nav.overview', href: '/dashboard', icon: PiChartBarBold },
    { name: 'dashboard.nav.quotes', href: '/dashboard/quotes', icon: PiClipboardTextFill },
    { name: 'dashboard.nav.inventory', href: '/dashboard/inventory', icon: PiCarFill },
    { name: 'dashboard.nav.chat', href: '/dashboard/chat', icon: PiChatCircleTextFill },
  ],
  user: [
    { name: 'dashboard.nav.overview', href: '/dashboard', icon: PiHouseBold },
    { name: 'dashboard.nav.quotes', href: '/dashboard/quotes', icon: PiClipboardTextFill },
    { name: 'dashboard.nav.chat', href: '/dashboard/chat', icon: PiChatCircleTextFill },
    { name: 'dashboard.nav.payments', href: '/dashboard/payments', icon: PiCurrencyDollarBold },
  ],
} as const;

const userNavigation = [
  { name: 'dashboard.nav.settings', href: '/settings', icon: PiGearFill },
  { name: 'dashboard.nav.help', href: '/help', icon: PiShieldCheckFill },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { viewMode } = useViewMode();
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

  // Ensure viewMode is a valid key and provide a default
  const currentViewMode = (viewMode || 'user') as keyof typeof navigation;
  const currentNavigation = navigation[currentViewMode] || navigation.user;

  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/dashboard-bg.webp)' }}
      />
      
      
      {/* Content */}
      <div className="relative z-10">
        <SidebarLayout>
          <SidebarLayout.Sidebar className="bg-white/10 backdrop-blur-xl border-r border-white/10">
            <div className="flex h-full flex-col gap-y-5">
              <div className="flex h-16 shrink-0 items-center px-6">
                <img
                  className="h-8 w-auto"
                  src="/logo-dark.svg"
                  alt="AutoQuote24"
                />
              </div>
              
              {/* Admin View Switcher */}
              {(user?.email === SUPER_ADMIN_EMAIL || user?.user_metadata?.role === 'admin') && (
                <div className="px-6 py-2">
                  <ViewSwitcher />
                </div>
              )}

              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {currentNavigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={cn(
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                isActive
                                  ? "bg-primary text-white"
                                  : "text-white/70 hover:text-white hover:bg-white/10"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "h-6 w-6 shrink-0",
                                  isActive ? "text-white" : "text-white/70 group-hover:text-white"
                                )}
                                aria-hidden="true"
                              />
                              {t(item.name)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  
                  <li>
                    <div className="text-xs font-semibold leading-6 text-white/50 px-2">
                      {t('header.settings')}
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {userNavigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={cn(
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                isActive
                                  ? "bg-primary text-white"
                                  : "text-white/70 hover:text-white hover:bg-white/10"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "h-6 w-6 shrink-0",
                                  isActive ? "text-white" : "text-white/70 group-hover:text-white"
                                )}
                                aria-hidden="true"
                              />
                              {t(item.name)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>

                  <li className="-mx-6 mt-auto">
                    <div className="flex items-center gap-x-4 px-6 py-4 text-sm font-semibold leading-6 text-white">
                      <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={avatarUrl || `https://ui-avatars.com/api/?name=${user?.email}&background=random`}
                        alt=""
                      />
                      <span className="sr-only">Your profile</span>
                      <span aria-hidden="true">{user?.email}</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </SidebarLayout.Sidebar>

          <SidebarLayout.Header>
            <div className="flex h-16 items-center gap-x-4 border-b border-white/10 bg-white/5 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-white/70 hover:text-white"
                  >
                    <span className="sr-only">{t('header.notifications')}</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/10"
                    aria-hidden="true"
                  />
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </SidebarLayout.Header>

          <SidebarLayout.Main className="bg-transparent">
            <Outlet />
          </SidebarLayout.Main>
        </SidebarLayout>
      </div>
    </div>
  );
}
