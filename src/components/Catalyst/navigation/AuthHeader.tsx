'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function AuthHeader({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href={`/${locale}`} 
            className="flex items-center transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          >
            <img
              className="h-8 w-auto"
              src="/dark.svg"
              alt="AutoQuote24"
            />
          </Link>
          
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#003139]/60 transition-all duration-200 hover:text-[#003139] hover:scale-[1.02]"
          >
            <HomeIcon className="h-4 w-4" />
            <span>{t('backToHome')}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
