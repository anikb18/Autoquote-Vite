'use client';

import {
  Sidebar as CatalystSidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarFooter,
} from '@/components/Catalyst/sidebar';
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface NavigationItem {
  name: string;
  href: string;
}

interface Props {
  translatedLabels: {
    newQuote: string;
    activeQuotes: string;
    quoteHistory: string;
    tradeIns: string;
    settings: string;
    darkMode: string;
    lightMode: string;
  };
  userRole: string;
}

export function Sidebar({ translatedLabels, userRole }: Props) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigation = [
    { name: translatedLabels.newQuote, href: '/dashboard/new-quote' },
    { name: translatedLabels.activeQuotes, href: '/dashboard/active-quotes' },
    { name: translatedLabels.quoteHistory, href: '/dashboard/history' },
    { name: translatedLabels.tradeIns, href: '/dashboard/trade-ins' },
    { name: translatedLabels.settings, href: '/dashboard/settings' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-lg ring-1 ring-gray-200 lg:hidden dark:bg-gray-800 dark:ring-gray-700"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <CatalystSidebar 
        className={`fixed z-40 flex h-full min-h-screen flex-col border-r bg-white transition-transform duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-800 
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'relative translate-x-0'}
          ${isMobile ? 'w-[280px]' : 'w-64'}`}
      >
        <SidebarHeader className="p-4">
          <Link to="/" className="text-lg font-semibold">
            AutoQuote24
          </Link>
        </SidebarHeader>

        <SidebarBody className="flex-1 overflow-y-auto">
          <SidebarSection>
            {navigation.map((item) => (
              <SidebarItem
                key={item.name}
                as={Link}
                to={item.href}
                isActive={location.pathname === item.href}
                onClick={() => isMobile && setIsOpen(false)}
              >
                {item.name}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarBody>

        <SidebarFooter className="flex flex-col gap-4 border-t p-4 dark:border-gray-800">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
          >
            <span>{theme === 'dark' ? t('theme.lightMode') : t('theme.darkMode')}</span>
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          
          <div className="relative">
            <LocaleSwitcher />
          </div>
        </SidebarFooter>
      </CatalystSidebar>
    </>
  );
}
