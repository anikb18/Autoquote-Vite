import { PiCarFill, PiChatCircleTextFill, PiCurrencyDollarBold, PiGearFill } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

export const quickActions = () => {
  const { t } = useTranslation();
  return [
    {
      name: t('dashboard.actions.new_quote'),
      icon: PiCarFill,
      href: '/quote/new'
    },
    {
      name: t('dashboard.actions.chat'),
      icon: PiChatCircleTextFill,
      href: '/chat'
    },
    {
      name: t('dashboard.actions.payments'),
      icon: PiCurrencyDollarBold,
      href: '/payments'
    },
    {
      name: t('dashboard.actions.settings'),
      icon: PiGearFill,
      href: '/settings'
    }
  ];
};
