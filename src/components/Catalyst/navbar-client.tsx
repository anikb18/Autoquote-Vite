'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'i18n/i18nNavigation';
import { Button } from './button';
import { ChevronDown, Bell, Search, MessageSquare, BarChart2 } from 'lucide-react';

interface NavbarClientProps {
  afterSignOutUrl: string;
  userType?: 'user' | 'dealer';
}

export function NavbarClient({ afterSignOutUrl, userType = 'user' }: NavbarClientProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations('Navigation');

  return (
    <div className="flex flex-1 justify-between items-center">
      {/* Search */}
      <div className="flex lg:flex-1">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">{t('search')}</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#003139] sm:text-sm sm:leading-6"
              placeholder={userType === 'dealer' ? t('search_leads') : t('search')}
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* Dealer-specific buttons */}
        {userType === 'dealer' && (
          <>
            <Button variant="ghost" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">{t('messages')}</span>
              <MessageSquare className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Button variant="ghost" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">{t('analytics')}</span>
              <BarChart2 className="h-6 w-6" aria-hidden="true" />
            </Button>
          </>
        )}

        {/* Notifications - common for both */}
        <Button variant="ghost" className="p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">{t('view_notifications')}</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
        </Button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">{t('profile')}</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src={user?.imageUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
              alt=""
            />
            <span className="hidden lg:flex lg:items-center">
              <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                {user?.firstName || t('user')}
              </span>
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
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
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/${userType === 'dealer' ? 'dealer' : ''}/profile`}
                    className={`
                      block px-3 py-1 text-sm leading-6
                      ${active ? 'bg-gray-50' : ''}
                    `}
                  >
                    {t('profile')}
                  </Link>
                )}
              </Menu.Item>
              {userType === 'dealer' && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dealer/settings"
                      className={`
                        block px-3 py-1 text-sm leading-6
                        ${active ? 'bg-gray-50' : ''}
                      `}
                    >
                      {t('dealer_settings')}
                    </Link>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut({ redirectUrl: afterSignOutUrl })}
                    className={`
                      block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900
                      ${active ? 'bg-gray-50' : ''}
                    `}
                  >
                    {t('sign_out')}
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
