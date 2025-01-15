import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/AuthProvider';
import { useViewMode } from '@/contexts/ViewModeContext';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { SidebarLayout } from '@/components/Catalyst/sidebar-layout';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useTheme } from '@/providers/theme-provider';
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

interface DashboardClientProps {
  children?: React.ReactNode;
}

const SUPER_ADMIN_EMAIL = 'anikbeauchemin18@gmail.com';

export function DashboardClient({ children }: DashboardClientProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { viewMode } = useViewMode();
  const { theme } = useTheme();
  const location = useLocation();
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.email) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('email', user.email)
        .single();

      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url as string);
      } else {
        // If no avatar in Supabase, use Gravatar
        const hash = md5(user.email.toLowerCase().trim());
        const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=mp`;
        setAvatarUrl(gravatarUrl);
      }
    };

    fetchAvatar();
  }, [user?.email]);

  // Navigation items for different roles
  const adminNavigation = [
    { name: 'dashboard', href: '/dashboard', icon: PiHouseBold },
    { name: 'dealers', href: '/dashboard/dealers', icon: PiStorefrontFill },
    { name: 'quotes', href: '/dashboard/quotes', icon: PiCarFill },
    { name: 'users', href: '/dashboard/users', icon: PiUsersBold },
    { name: 'analytics', href: '/dashboard/analytics', icon: PiChartLineUpBold },
    { name: 'security', href: '/dashboard/security', icon: PiShieldCheckFill },
    { name: 'settings', href: '/dashboard/settings', icon: PiGearFill },
  ];

  const dealerNavigation = [
    { name: 'dashboard', href: '/dashboard', icon: PiHouseBold },
    { name: 'quotes', href: '/dashboard/quotes', icon: PiCarFill },
    { name: 'auctions', href: '/dashboard/auctions', icon: PiHandshakeFill },
    { name: 'inventory', href: '/dashboard/inventory', icon: PiClipboardTextFill },
    { name: 'dealership', href: '/dashboard/dealership', icon: PiBuildingsFill },
    { name: 'team', href: '/dashboard/team', icon: PiUsersThreeFill },
    { name: 'settings', href: '/dashboard/settings', icon: PiGearFill },
  ];

  const userNavigation = [
    { name: 'dashboard', href: '/dashboard', icon: PiHouseBold },
    { name: 'my_quotes', href: '/dashboard/my-quotes', icon: PiCarFill },
    { name: 'messages', href: '/dashboard/messages', icon: PiChatCircleTextFill },
    { name: 'profile', href: '/dashboard/profile', icon: PiUserGearFill },
  ];

  // Quick actions for different roles
  const adminQuickActions = [
    { name: 'add_dealer', href: '/dashboard/dealers/new', icon: PiStorefrontFill },
    { name: 'view_reports', href: '/dashboard/reports', icon: PiChartBarBold },
  ];

  const dealerQuickActions = [
    { name: 'new_quote', href: '/dashboard/quotes/new', icon: PiCarFill },
    { name: 'view_auctions', href: '/dashboard/auctions', icon: PiHandshakeFill },
    { name: 'add_inventory', href: '/dashboard/inventory/new', icon: PiClipboardTextFill },
  ];

  const userQuickActions = [
    { name: 'request_quote', href: '/dashboard/request-quote', icon: PiCarFill },
    { name: 'trade_in', href: '/dashboard/trade-in', icon: PiCurrencyDollarBold },
    { name: 'contact_dealer', href: '/dashboard/messages/new', icon: PiChatCircleTextFill },
  ];

  // Get current navigation and quick actions based on view mode
  const getCurrentNavigation = () => {
    switch (viewMode) {
      case 'admin':
        return adminNavigation;
      case 'dealer':
        return dealerNavigation;
      case 'user':
      default:
        return userNavigation;
    }
  };

  const getCurrentQuickActions = () => {
    switch (viewMode) {
      case 'admin':
        return adminQuickActions;
      case 'dealer':
        return dealerQuickActions;
      case 'user':
      default:
        return userQuickActions;
    }
  };

  const navigation = getCurrentNavigation();
  const quickActions = getCurrentQuickActions();

  const renderSidebar = () => (
    <>
      {/* Logo */}
      <div className="flex items-center pb-4">
        <img
          className="h-8 w-auto"
          src={theme === 'dark' ? '/light.png' : '/dark.png'}
          alt="AutoQuote24"
        />
      </div>

      {/* View Mode Switcher for Super Admin */}
      {isSuperAdmin && (
        <div className="py-3 border-y border-gray-200">
          <ViewSwitcher />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-8">
        <ul role="list" className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {t(`dashboard.navigation.${item.name}`)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Quick Actions */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {t('dashboard.quickActions.title')}
          </h3>
          <ul role="list" className="mt-2 space-y-1">
            {quickActions.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {t(`dashboard.quickActions.${item.name}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Account */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="group w-full flex items-center">
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={avatarUrl}
                alt={user?.email || ''}
              />
            ) : (
              <div className="inline-block h-9 w-9 rounded-full bg-gray-200" />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {user?.email}
            </p>
            <button
              onClick={() => signOut()}
              className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
            >
              {t('dashboard.account.signOut')}
            </button>
          </div>
        </div>
        <div className="mt-3">
          <LocaleSwitcher />
        </div>
      </div>
    </>
  );

  const renderNavbar = () => (
    <>
      {/* View Mode Indicator */}
      {isSuperAdmin && (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500">
            {t(`dashboard.viewMode.${viewMode}`)}
          </span>
        </div>
      )}

      {/* Right side toolbar */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">{t('dashboard.notifications')}</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );

  return (
    <SidebarLayout
      sidebar={renderSidebar()}
      navbar={renderNavbar()}
    >
      <div className="relative py-6 overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </SidebarLayout>
  );
}
