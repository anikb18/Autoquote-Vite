'use client';

import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useLanguagePreference } from '@/hooks/useLanguagePreference';
import { defaultLocale, locales } from '@/libs/i18nNavigation';

const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'fr-CA', name: 'Français' },
] as const;

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const { setLanguagePreference } = useLanguagePreference();

  const currentLocale = i18n.language || defaultLocale;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguagePreference(lng);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <Menu as="div" className="relative w-full">
      <div>
        <Menu.Button className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700">
          {currentLanguage.name}
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute left-0 top-full z-[100] mt-2 w-full origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
        {languages.map((language) => (
          <Menu.Item key={language.code}>
            {({ active }) => (
              <button
                onClick={() => changeLanguage(language.code)}
                className={`${
                  active 
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                } block w-full px-4 py-2 text-left text-sm`}
              >
                {language.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
