import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PiChartLineUpBold,
  PiCarFill,
  PiCurrencyDollarBold,
  PiGearFill,
  PiBellBold,
  PiChatTextBold,
  PiUserCircleFill,
  PiStorefrontFill,
  PiShieldCheckFill,
  PiClipboardTextFill,
  PiUsersFourFill,
  PiTagFill,
  PiStackFill,
} from 'react-icons/pi';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

interface DashboardSidebarProps {
  locale: string;
  userType: string;
}

export function DashboardSidebar({ locale, userType }: DashboardSidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation: NavItem[] = [
    // Common navigation items
    {
      name: t('navigation.dashboard'),
      href: '/dashboard',
      icon: <PiChartLineUpBold className="h-6 w-6" />,
    },

    // User-specific navigation items
    {
      name: t('navigation.requestQuote'),
      href: '/dashboard/request-quote',
      icon: <PiClipboardTextFill className="h-6 w-6" />,
      roles: ['user'],
    },
    {
      name: t('navigation.myQuotes'),
      href: '/dashboard/my-quotes',
      icon: <PiCarFill className="h-6 w-6" />,
      roles: ['user'],
    },

    // Dealer-specific navigation items
    {
      name: t('navigation.dealership'),
      href: '/dashboard/dealership',
      icon: <PiStorefrontFill className="h-6 w-6" />,
      roles: ['dealer'],
    },
    {
      name: t('navigation.inventory'),
      href: '/dashboard/inventory',
      icon: <PiTagFill className="h-6 w-6" />,
      roles: ['dealer'],
    },
    {
      name: t('navigation.quotes'),
      href: '/dashboard/quotes',
      icon: <PiCarFill className="h-6 w-6" />,
      roles: ['dealer'],
    },
    {
      name: t('navigation.auctions'),
      href: '/dashboard/auctions',
      icon: <PiCurrencyDollarBold className="h-6 w-6" />,
      roles: ['dealer'],
    },

    // Admin-specific navigation items
    {
      name: t('navigation.dealers'),
      href: '/dashboard/dealers',
      icon: <PiStorefrontFill className="h-6 w-6" />,
      roles: ['admin'],
    },
    {
      name: t('navigation.users'),
      href: '/dashboard/users',
      icon: <PiUsersFourFill className="h-6 w-6" />,
      roles: ['admin'],
    },
    {
      name: t('navigation.analytics'),
      href: '/dashboard/analytics',
      icon: <PiChartLineUpBold className="h-6 w-6" />,
      roles: ['admin'],
    },

    // Common navigation items (continued)
    {
      name: t('navigation.messages'),
      href: '/dashboard/messages',
      icon: <PiChatTextBold className="h-6 w-6" />,
    },
    {
      name: t('navigation.notifications'),
      href: '/dashboard/notifications',
      icon: <PiBellBold className="h-6 w-6" />,
    },
    {
      name: t('navigation.security'),
      href: '/dashboard/security',
      icon: <PiShieldCheckFill className="h-6 w-6" />,
    },
    {
      name: t('navigation.settings'),
      href: '/dashboard/settings',
      icon: <PiGearFill className="h-6 w-6" />,
    },
  ];

  // Filter navigation items based on user type
  const filteredNavigation = navigation.filter(
    (item) => !item.roles || item.roles.includes(userType)
  );

  // Group navigation items
  const mainNavigation = filteredNavigation.filter(
    (item) => !['settings', 'security'].includes(item.href.split('/').pop()!)
  );
  const settingsNavigation = filteredNavigation.filter(
    (item) => ['settings', 'security'].includes(item.href.split('/').pop()!)
  );

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <img
          src="/logo.svg"
          alt="AutoQuote24"
          className="h-8 w-auto"
        />
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    color: isActive ? 'rgb(37, 99, 235)' : 'rgb(55, 65, 81)',
                  }}
                  className="mr-3"
                >
                  {item.icon}
                </motion.div>
                {item.name}
              </Link>
            );
          })}
        </div>

        {settingsNavigation.length > 0 && (
          <>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">
                  {t('navigation.preferences')}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              {settingsNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        color: isActive ? 'rgb(37, 99, 235)' : 'rgb(55, 65, 81)',
                      }}
                      className="mr-3"
                    >
                      {item.icon}
                    </motion.div>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </nav>
      <div className="mt-auto border-t p-4">
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-gray-50"
        >
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div>
            <div className="font-medium text-gray-700">
              {userType === 'dealer' ? t('common.dealer') : t('common.buyer')}
            </div>
            <div className="text-xs text-gray-500">{t('common.viewProfile')}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
