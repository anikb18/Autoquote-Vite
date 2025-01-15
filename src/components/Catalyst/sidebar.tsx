'use client';

import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import { default as React, useState } from 'react';
import { TouchTarget } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function CollapsibleSidebar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      {...props}
      className={clsx(
        'relative flex h-screen flex-col border-r bg-gray-100/40 transition-all duration-300 dark:bg-gray-800/40',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <SidebarHeader>
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className={clsx('text-lg font-semibold text-gray-900 dark:text-white', isCollapsed && 'sr-only')}>
            AutoQuote24
          </span>
        </Link>
      </SidebarHeader>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;

  const navigation = [
    {
      title: t('nav.dashboard'),
      href: '/dashboard',
    },
    {
      title: t('quotes.createQuote'),
      href: '/quotes/new',
    },
    {
      title: t('quotes.viewQuotes'),
      href: '/dashboard/dealer/quotes',
    },
    {
      title: t('settings.settings'),
      href: '/settings',
    },
    {
      title: t('help.help'),
      href: '/help',
    },
  ];

  return (
    <CollapsibleSidebar className={className}>
      <nav className="grid items-start px-4 text-sm font-medium">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                isActive ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
              )}
            >
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </CollapsibleSidebar>
  );
}

export function SidebarNav({ children }: { children: React.ReactNode }) {
  return <nav className="flex-1">{children}</nav>;
}

export function SidebarList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-1">{children}</ul>;
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx('flex h-16 items-center border-b px-4 dark:border-gray-800', className)}
    />
  );
}

export function SidebarBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx('flex-1 overflow-y-auto px-4 py-2', className)}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx('mt-auto border-t px-4 py-4 dark:border-gray-800', className)}
    />
  );
}

export function SidebarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={clsx('space-y-3', className)} />
  );
}

export function SidebarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr {...props} className={clsx('border-t dark:border-gray-800', className)} />
  );
}

export function SidebarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx('h-6', className)} />;
}

export function SidebarHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={clsx(
        'mb-2 px-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400',
        className
      )}
    />
  );
}

export const SidebarItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & { isActive?: boolean }
>(function SidebarItem({ isActive, className, children, ...props }, ref) {
  return (
    <Link
      ref={ref}
      className={clsx(
        'group flex items-center rounded-lg px-3 py-2 text-sm font-medium',
        isActive
          ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});

export function SidebarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx('flex-1', className)} />;
}
