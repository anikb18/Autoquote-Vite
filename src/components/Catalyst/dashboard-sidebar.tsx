'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LayoutDashboard, FileText, Car, Settings } from 'lucide-react';
import Image from 'next/image';

interface DashboardSidebarProps {
  locale: string;
  userType: 'user' | 'dealer';
}

export function DashboardSidebar({ locale, userType }: DashboardSidebarProps) {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();

  const userNavigation = [
    {
      name: t('nav.dashboard'),
      href: `/${locale}/dashboard`,
      iconName: 'LayoutDashboard',
      current: pathname === `/${locale}/dashboard`
    },
    {
      name: t('nav.quotes'),
      href: `/${locale}/quotes`,
      iconName: 'FileText',
      current: pathname.startsWith(`/${locale}/quotes`),
      highlight: true // This quote section should be highlighted
    },
    {
      name: t('nav.tradeIn'),
      href: `/${locale}/trade-in`,
      iconName: 'Car',
      current: pathname.startsWith(`/${locale}/trade-in`)
    },
    {
      name: t('nav.settings'),
      href: `/${locale}/settings`,
      iconName: 'Settings',
      current: pathname.startsWith(`/${locale}/settings`)
    }
  ];

  const navigation = userType === 'user' ? userNavigation : [];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard':
        return <LayoutDashboard className="h-6 w-6" />;
      case 'FileText':
        return <FileText className="h-6 w-6" />;
      case 'Car':
        return <Car className="h-6 w-6" />;
      case 'Settings':
        return <Settings className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col gap-y-5">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-start border-b border-gray-200 px-6">
        <Link href={`/${locale}`} className="flex items-center">
          <Logo className={cn(
            'h-8 w-auto',
            '[&_path]:fill-[#003139]'  // Brand color for the SVG paths
          )} />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      item.current
                        ? 'bg-gray-50 text-[#003139]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#003139]',
                      item.highlight
                        ? 'font-semibold bg-blue-50'
                        : '',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6'
                    )}
                  >
                    <span className={cn(
                      item.current ? 'text-[#003139]' : 'text-gray-400 group-hover:text-[#003139]',
                      'h-6 w-6 shrink-0'
                    )}>
                      {getIcon(item.iconName)}
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
