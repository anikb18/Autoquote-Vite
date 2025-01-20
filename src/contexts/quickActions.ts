import { PiCarFill, PiChatCircleTextFill, PiCurrencyDollarBold, PiGearFill } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';


export const quickActions = [
  {
    name: 'dashboard.actions.new_quote', // Translation key
    icon: PiCarFill,
    href: '/quotes/new'
  },
  {
    name: 'dashboard.actions.chat', // Translation key
    icon: PiChatCircleTextFill,
    href: '/chat'
  },
  {
    name: 'dashboard.actions.payments', // Translation key
    icon: PiCurrencyDollarBold,
    href: '/payments'
  },
  {
    name: 'dashboard.actions.settings', // Translation key
    icon: PiGearFill,
    href: '/settings'
  }
];