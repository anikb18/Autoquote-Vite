import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthProvider';
import { useViewMode } from '@/contexts/ViewModeContext';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '@/contexts/navigation';
import { quickActions } from '@/contexts/quickActions';
import { Cog } from 'lucide-react';
import md5 from 'md5';
import cn from 'classnames';
import Dashboard from '@/components/Dashboard/DashboardContent/Dashboard';

const SUPER_ADMIN_EMAIL = import.meta.env.VITE_SUPER_ADMIN_EMAIL;

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { viewMode } = useViewMode();
  const location = useLocation();
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Determine the user's role
  const userRole = user?.user_metadata?.role || 'user'; // Default to 'user' if role is not defined
  const navItems = navigation[userRole]; // Access the navigation array for the user's role

  // Fetch Gravatar or fallback to UI Avatars
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.email) return;
      const hash = md5(user.email.toLowerCase().trim());
      const url = `https://www.gravatar.com/avatar/${hash}?d=404`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          setAvatarUrl(url);
        } else {
          throw new Error('Failed to fetch avatar');
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
        // Fallback to UI Avatars if Gravatar fails or user has no email
        setAvatarUrl(`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random`);
      }
    };

    fetchAvatar();
  }, [user?.email]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/dashboard-bg.webp)' }}
      />
      <div className="relative z-10">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="flex h-full flex-col gap-y-5 w-64 bg-white shadow-sm">
            {/* Logo */}
            <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
              <img className="h-8 w-auto" src="/dark.svg" alt="AutoQuote24" />
            </div>

            {/* View Switcher (for admin/super admin) */}
            {(isSuperAdmin || user?.user_metadata?.role === 'admin') && (
              <div className="px-6 py-2">
                <ViewSwitcher />
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1 px-6">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={cn(
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                              isActive ? 'bg-primary text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            )}
                          >
                            <item.icon
                              className={cn(
                                'h-6 w-6 shrink-0',
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'
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

                {/* Quick Actions */}
                <li className="px-6">
                  <div className="text-xs font-semibold leading-6 text-gray-400">{t('header.settings')}</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {/* Add a link to the settings page */}
                    <li>
                      <Link
                        to="/dashboard/settings"
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          location.pathname === '/dashboard/settings' ? 'bg-primary text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        <Cog
                          className={cn(
                            'h-6 w-6 shrink-0',
                            location.pathname === '/dashboard/settings' ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'
                          )}
                          aria-hidden="true"
                        />
                        {t('settings.title')}
                      </Link>
                    </li>
                    {quickActions.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={cn(
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                              isActive ? 'bg-primary text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            )}
                          >
                            <item.icon
                              className={cn(
                                'h-6 w-6 shrink-0',
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'
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

                {/* User Profile and Sign Out */}
                <li className="mt-auto px-6 pb-4">
                  <div className="flex items-center gap-x-4 py-3">
                    <img
                      className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-50"
                      src={avatarUrl}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="truncate text-sm font-semibold text-gray-900">{user?.email}</p>
                      <button
                        onClick={() => signOut()}
                        className="mt-1 text-sm text-gray-500 hover:text-gray-700"
                      >
                        {t('header.signOut')}
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-transparent p-6 overflow-y-auto">
            <Dashboard /> {/* Render the Dashboard component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
