'use client';

import { useTranslations } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PiChartLineUpBold,
  PiCarFill,
  PiCurrencyDollarBold,
  PiGearFill,
  PiBellBold,
  PiChatTextBold,
} from 'react-icons/pi';

interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  locale: string;
  userType: string;
}

export function DashboardSidebar({ locale, userType }: DashboardSidebarProps) {
  const { t } = useTranslations('navigation');
  const location = useLocation();

  const navigation: NavItem[] = [
    {
      name: t('dashboard'),
      to: '/dashboard',
      icon: <PiChartLineUpBold className="h-6 w-6" />,
    },
    {
      name: t('quotes'),
      to: '/dashboard/quotes',
      icon: <PiCarFill className="h-6 w-6" />,
    },
    {
      name: t('auctions'),
      to: '/dashboard/auctions',
      icon: <PiCurrencyDollarBold className="h-6 w-6" />,
    },
    {
      name: t('messages'),
      to: '/dashboard/messages',
      icon: <PiChatTextBold className="h-6 w-6" />,
    },
    ...(userType === 'dealer' ? [
      {
        name: t('tradeIn'),
        to: '/dashboard/trade-ins',
        icon: <PiCurrencyDollarBold className="h-6 w-6" />,
      }
    ] : []),
    {
      name: t('notifications'),
      to: '/dashboard/notifications',
      icon: <PiBellBold className="h-6 w-6" />,
    },
    {
      name: t('settings'),
      to: '/settings',
      icon: <PiGearFill className="h-6 w-6" />,
    },
  ].filter(Boolean);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-8">
        <Link to="/" className="block">
          <img
            src="/dark.svg"
            alt="AutoQuote24"
            width={180}
            height={40}
            className="w-auto h-8"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 px-4">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.name}
              to={item.to}
              className="group relative"
            >
              <motion.div
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900/40 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl ring-2 ring-slate-200/20"
                    layoutId="sidebar-active"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
