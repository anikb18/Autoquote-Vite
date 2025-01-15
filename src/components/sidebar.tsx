'use client';

import {
  Sidebar as CatalystSidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
} from '@/components/Catalyst/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  };
  userRole: string;
}

export function Sidebar({ translatedLabels, userRole }: Props) {
  const pathname = usePathname();

  const navigation = [
    { name: translatedLabels.newQuote, href: '/dashboard/new-quote' },
    { name: translatedLabels.activeQuotes, href: '/dashboard/active-quotes' },
    { name: translatedLabels.quoteHistory, href: '/dashboard/history' },
    { name: translatedLabels.tradeIns, href: '/dashboard/trade-ins' },
    { name: translatedLabels.settings, href: '/dashboard/settings' },
  ];

  return (
    <CatalystSidebar>
      <SidebarHeader>
        <Link href="/" className="text-lg font-semibold">
          AutoQuote24
        </Link>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          {navigation.map((item) => (
            <SidebarItem
              key={item.name}
              href={item.href}
              current={pathname === item.href}
            >
              {item.name}
            </SidebarItem>
          ))}
        </SidebarSection>
      </SidebarBody>
    </CatalystSidebar>
  );
}
