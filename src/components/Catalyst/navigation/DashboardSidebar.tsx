'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/libs/i18nNavigation';
import { useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  HelpCircle,
  Repeat,
  ChevronDown
} from 'lucide-react';
import { Logo } from '../Logo';
import { UserButton } from '@clerk/nextjs';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  badge?: number;
}

export function DashboardSidebar({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const navigation: NavigationItem[] = [
    { 
      name: t('dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    { 
      name: t('quotes'),
      href: '/quotes',
      icon: Car,
      current: pathname === '/quotes',
      badge: 3
    },
    { 
      name: t('tradeIn'),
      href: '/trade-in',
      icon: Repeat,
      current: pathname === '/trade-in'
    },
    { 
      name: t('messages'),
      href: '/messages',
      icon: MessageSquare,
      current: pathname === '/messages',
      badge: 2
    },
    { 
      name: t('documents'),
      href: '/documents',
      icon: FileText,
      current: pathname === '/documents'
    }
  ];

  const secondaryNavigation = [
    { 
      name: t('settings'),
      href: '/settings',
      icon: Settings,
      current: pathname === '/settings'
    },
    { 
      name: t('help'),
      href: '/help',
      icon: HelpCircle,
      current: pathname === '/help'
    }
  ];

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component for mobile */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#003139] px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Logo className="h-8 w-auto text-white" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={cn(
                                  item.current
                                    ? 'bg-[#446df6] text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-[#446df6]/80',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                                {item.badge && (
                                  <span className="ml-auto w-5 h-5 rounded-full bg-[#446df6]/20 text-[0.625rem] font-medium flex items-center justify-center text-white">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">{t('support')}</div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {secondaryNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={cn(
                                  item.current
                                    ? 'bg-[#446df6] text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-[#446df6]/80',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <div className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-300 hover:bg-[#446df6]/80 hover:text-white">
                          <UserButton
                            appearance={{
                              elements: {
                                rootBox: "h-6",
                                avatarBox: "h-6 w-6"
                              }
                            }}
                          />
                          <span className="truncate">{t('profile')}</span>
                          <ChevronDown className="ml-auto h-5 w-5 shrink-0 text-gray-400 group-hover:text-white" />
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#003139] px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Logo className="h-8 w-auto text-white" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          item.current
                            ? 'bg-[#446df6] text-white'
                            : 'text-gray-300 hover:text-white hover:bg-[#446df6]/80',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                        {item.badge && (
                          <span className="ml-auto w-5 h-5 rounded-full bg-[#446df6]/20 text-[0.625rem] font-medium flex items-center justify-center text-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">{t('support')}</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          item.current
                            ? 'bg-[#446df6] text-white'
                            : 'text-gray-300 hover:text-white hover:bg-[#446df6]/80',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-300 hover:bg-[#446df6]/80 hover:text-white">
                  <UserButton
                    appearance={{
                      elements: {
                        rootBox: "h-6",
                        avatarBox: "h-6 w-6"
                      }
                    }}
                  />
                  <span className="truncate">{t('profile')}</span>
                  <ChevronDown className="ml-auto h-5 w-5 shrink-0 text-gray-400 group-hover:text-white" />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#003139] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-300 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
      </div>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
