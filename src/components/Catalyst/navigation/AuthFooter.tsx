'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function AuthFooter({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  const tAuth = useTranslations('auth.layout');

  return (
    <footer className="bg-[#003139]/5 mt-auto">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8 sm:py-10 lg:px-8">
        <nav className="-mb-6 flex flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
            <ShieldCheckIcon className="h-4 w-4 text-[#446df6]" />
            <span>{tAuth('securityNote')}</span>
            <Link 
              href={`/${locale}/security`} 
              className="ml-1 font-medium text-[#446df6] transition-colors duration-200 hover:text-[#446df6]/80"
            >
              {t('learnMore')} →
            </Link>
          </div>

          <div className="flex justify-center gap-6">
            <Link
              href={`/${locale}`}
              className="text-[13px] font-medium text-gray-600 transition-colors duration-200 hover:text-[#003139]"
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/pricing`}
              className="text-[13px] font-medium text-gray-600 transition-colors duration-200 hover:text-[#003139]"
            >
              {t('pricing')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-[13px] font-medium text-gray-600 transition-colors duration-200 hover:text-[#003139]"
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-[13px] font-medium text-gray-600 transition-colors duration-200 hover:text-[#003139]"
            >
              {t('contact')}
            </Link>
          </div>

          <p className="text-center text-[13px] text-gray-500">
            &copy; {new Date().getFullYear()} AutoQuote24. {t('allRightsReserved')}
          </p>
        </nav>
      </div>
    </footer>
  );
}
