import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const COOKIE_NAME = 'preferred-language';

const languages = {
  en: 'English',
  fr: 'Français'
};

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (locale: string) => {
    document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=31536000`; // 1 year
    i18n.changeLanguage(locale);
    // Refresh the current route with new language
    navigate(window.location.pathname);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-slate-900 hover:bg-slate-100">
        <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.entries(languages).map(([locale, label]) => (
              <Menu.Item key={locale}>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange(locale)}
                    className={`${
                      active ? 'bg-slate-100' : ''
                    } block w-full px-4 py-2 text-left text-sm ${
                      i18n.language === locale ? 'font-semibold' : ''
                    }`}
                  >
                    {label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
