import { LayoutDashboard, FileText, Settings, Car } from 'lucide-react';

export const NAV_ITEMS = [
  {
    name: 'nav.dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: true
  },
  {
    name: 'nav.quotes',
    href: '/quotes',
    icon: FileText,
    current: false
  },
  {
    name: 'nav.settings',
    href: '/settings',
    icon: Settings,
    current: false
  }
];

export const QUICK_ACTIONS = [
  {
    name: 'new_quote_request',
    href: '/quote/new',
    icon: Car
  }
];
