'use client';

import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useLanguagePreference } from '@/hooks/useLanguagePreference';
import { defaultLocale, locales } from '@/libs/i18nNavigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
] as const;

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const { setLanguagePreference } = useLanguagePreference();

  const currentLocale = typeof window !== 'undefined' 
    ? window.location.pathname.split('/')[1] 
    : defaultLocale;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguagePreference(lng);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {currentLanguage.name}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {languages.map((language) => (
            <Menu.Item key={language.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(language.code)}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full px-4 py-2 text-left text-sm`}
                >
                  {language.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};
