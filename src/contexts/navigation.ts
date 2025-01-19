import { 
  PiChartBarBold, 
  PiStorefrontFill, 
  PiUsersBold, 
  PiClipboardTextFill, 
  PiCurrencyDollarBold, 
  PiCarFill, 
  PiHouseBold, 
  PiChartLineUpBold,
  PiChatCircleTextFill
} from 'react-icons/pi';

export const navigation = { 
  admin: [ 
    { name: 'dashboard.nav.overview', href: '/dashboard', icon: PiChartBarBold }, 
    { name: 'dashboard.nav.dealers', href: '/dashboard/dealers', icon: PiStorefrontFill }, 
    { name: 'dashboard.nav.users', href: '/dashboard/users', icon: PiUsersBold }, 
    { name: 'dashboard.nav.quotes', href: '/dashboard/quotes', icon: PiClipboardTextFill }, 
    { name: 'dashboard.nav.analytics', href: '/dashboard/analytics', icon: PiChartLineUpBold }, 
  ], 
  dealer: [ 
    { name: 'dashboard.nav.overview', href: '/dashboard', icon: PiChartBarBold }, 
    { name: 'dashboard.nav.quotes', href: '/dashboard/quotes', icon: PiClipboardTextFill }, 
    { name: 'dashboard.nav.inventory', href: '/dashboard/inventory', icon: PiCarFill }, 
    { name: 'dashboard.nav.chat', href: '/dashboard/chat', icon: PiChatCircleTextFill }, 
  ], 
  user: [ 
    { name: 'dashboard.nav.overview', href: '/dashboard', icon: PiHouseBold }, 
    { name: 'dashboard.nav.quotes', href: '/dashboard/quotes', icon: PiClipboardTextFill }, 
    { name: 'dashboard.nav.chat', href: '/dashboard/chat', icon: PiChatCircleTextFill }, 
    { name: 'dashboard.nav.payments', href: '/dashboard/payments', icon: PiCurrencyDollarBold }, 
  ], 
} as const;
