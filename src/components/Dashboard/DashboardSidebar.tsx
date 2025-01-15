'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Link } from 'next/link';
import Image from 'next/image';
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
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  locale: string;
  userType: string;
}

export function DashboardSidebar({ locale, userType }: DashboardSidebarProps) {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navigation: NavItem[] = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      icon: <PiChartLineUpBold className="h-6 w-6" />,
    },
    {
      name: t('quotes'),
      href: '/dashboard/quotes',
      icon: <PiCarFill className="h-6 w-6" />,
    },
    {
      name: t('auctions'),
      href: '/dashboard/auctions',
      icon: <PiCurrencyDollarBold className="h-6 w-6" />,
    },
    {
      name: t('messages'),
      href: '/dashboard/messages',
      icon: <PiChatTextBold className="h-6 w-6" />,
    },
    ...(userType === 'dealer' ? [
      {
        name: t('tradeIn'),
        href: '/dashboard/trade-ins',
        icon: <PiCurrencyDollarBold className="h-6 w-6" />,
      }
    ] : []),
    {
      name: t('notifications'),
      href: '/dashboard/notifications',
      icon: <PiBellBold className="h-6 w-6" />,
    },
    {
      name: t('settings'),
      href: '/settings',
      icon: <PiGearFill className="h-6 w-6" />,
    },
  ].filter(Boolean);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-8">
        <Link href="/" className="block">
          <Image
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
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
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
