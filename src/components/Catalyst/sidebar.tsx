'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import { default as React, useState } from 'react';
import { TouchTarget } from './button';
import { Link } from './link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeAwareLogo } from '@/components/Logo/ThemeAwareLogo';

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
        <Link href="/" className="flex items-center justify-center gap-2">
          <ThemeAwareLogo iconOnly={isCollapsed} />
        </Link>
      </SidebarHeader>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-sm"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export function Sidebar({ className = '' }: SidebarProps) {
  const t = useTranslations();
  const pathname = usePathname();

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
              href={item.href}
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
  return <nav className="grid gap-1">{children}</nav>;
}

export function SidebarList({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-1">{children}</div>;
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx('flex h-14 items-center justify-center border-b px-6', className)}
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
      className={clsx('flex-1 overflow-auto py-2', className)}
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
      className={clsx('mt-auto flex items-center gap-2 p-4', className)}
    />
  );
}

export function SidebarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={clsx('grid gap-1 px-3 pb-2', className)} />
  );
}

export function SidebarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'hr'>) {
  return <hr {...props} className={clsx('my-2 border-gray-200', className)} />;
}

export function SidebarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx('h-4', className)} />;
}

export function SidebarHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={clsx(
        'mb-2 px-3 text-xs font-medium uppercase text-gray-500',
        className
      )}
    />
  );
}

export const SidebarItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & { current?: boolean }
>(function SidebarItem({ current, className, children, ...props }, ref) {
  return (
    <TouchTarget>
      <a
        ref={ref}
        {...props}
        className={clsx(
          'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800',
          current &&
            'text-gray-900 before:absolute before:-left-4 before:top-1 before:h-8 before:w-1 before:rounded-full before:bg-gray-300 dark:text-white dark:before:bg-gray-500',
          className
        )}
      >
        {children}
      </a>
    </TouchTarget>
  );
});

export function SidebarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx('truncate', className)} />;
}
