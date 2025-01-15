
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/libs/i18nNavigation';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇨🇦' }
];

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);

  const switchLocale = React.useCallback((newLocale: string) => {
    router.push({ href: pathname, locale: newLocale });
    setIsOpen(false);
  }, [pathname, router]);

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('button')}
      >
        <Globe className="h-4 w-4 text-slate-600 group-hover:text-slate-900" />
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  locale === lang.code
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
                {locale === lang.code && (
                  <motion.span
                    layoutId="active-check"
                    className="ml-auto text-blue-700"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
