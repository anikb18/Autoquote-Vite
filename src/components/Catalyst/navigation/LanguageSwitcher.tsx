'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';
import { AppConfig } from '@/utils/AppConfig';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

interface Props {
  locale: string;
}

export default function LanguageSwitcher({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    fr: { name: 'Français', flag: '🇨🇦' },
  };

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors duration-200">
          {languages[locale as keyof typeof languages].flag}
          <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <Menu.Item key={code}>
                {({ active }) => (
                  <button
                    onClick={() => switchLanguage(code)}
                    className={clsx(
                      active ? 'bg-gray-50' : '',
                      'flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors duration-200',
                      code === locale ? 'font-medium text-[#446df6]' : ''
                    )}
                  >
                    <span>{flag}</span>
                    <span>{name}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
