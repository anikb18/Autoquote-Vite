import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { cn } from '@/lib/utils';
import {
  PiChartLineUpBold,
  PiCarFill,
  PiHandshakeFill,
  PiChartBarBold,
  PiHouseBold,
  PiUsersBold,
  PiGearBold,
  PiChatCircleTextFill,
  PiClockCountdownFill,
  PiEnvelopeFill,
  PiShieldCheckFill,
  PiTimerFill,
  PiTrendUpBold,
  PiBuildingsBold,
  PiUserCircleBold,
} from 'react-icons/pi';
import { Logo } from './logo';

const adminNavigation = [
  { name: 'sidebar.dashboard', href: '/dashboard', icon: PiChartLineUpBold },
  { name: 'sidebar.dealers', href: '/dashboard/dealers', icon: PiHouseBold },
  { name: 'sidebar.users', href: '/dashboard/users', icon: PiUsersBold },
  { name: 'sidebar.analytics', href: '/dashboard/analytics', icon: PiChartBarBold },
  { name: 'sidebar.security', href: '/dashboard/security', icon: PiShieldCheckFill },
  { name: 'sidebar.settings', href: '/dashboard/settings', icon: PiGearBold },
];

const dealerNavigation = [
  { name: 'sidebar.dashboard', href: '/dashboard', icon: PiChartLineUpBold },
  { name: 'sidebar.quotes', href: '/dashboard/quotes', icon: PiChatCircleTextFill },
  { name: 'sidebar.auctions', href: '/dashboard/auctions', icon: PiClockCountdownFill },
  { name: 'sidebar.messages', href: '/dashboard/messages', icon: PiEnvelopeFill },
  { name: 'sidebar.dealership', href: '/dashboard/dealership', icon: PiBuildingsBold },
  { name: 'sidebar.team', href: '/dashboard/team', icon: PiUsersBold },
  { name: 'sidebar.inventory', href: '/dashboard/inventory', icon: PiCarFill },
  { name: 'sidebar.analytics', href: '/dashboard/analytics', icon: PiChartBarBold },
  { name: 'sidebar.settings', href: '/dashboard/settings', icon: PiGearBold },
];

const customerNavigation = [
  { name: 'sidebar.dashboard', href: '/dashboard', icon: PiChartLineUpBold },
  { name: 'sidebar.quotes', href: '/dashboard/quotes', icon: PiChatCircleTextFill },
  { name: 'sidebar.vehicles', href: '/dashboard/vehicles', icon: PiCarFill },
  { name: 'sidebar.messages', href: '/dashboard/messages', icon: PiEnvelopeFill },
  { name: 'sidebar.profile', href: '/dashboard/profile', icon: PiUserCircleBold },
  { name: 'sidebar.settings', href: '/dashboard/settings', icon: PiGearBold },
];

export function Sidebar() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();
  const location = useLocation();

  const navigation = {
    admin: adminNavigation,
    dealer: dealerNavigation,
    customer: customerNavigation,
  }[viewMode as keyof typeof navigation];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Logo className="h-8 w-auto" />
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                    )}
                    aria-hidden="true"
                  />
                  {t(item.name)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
