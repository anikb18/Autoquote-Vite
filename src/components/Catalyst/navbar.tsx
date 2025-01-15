'use client';

import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import React, { useId } from 'react';
import { Button } from './button';
import { Link } from './link';

export function Navbar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav {...props} className={clsx(className, 'flex flex-1 items-center gap-4 py-2.5')} />;
}

export function NavbarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden="true" {...props} className={clsx(className, 'h-6 w-px bg-zinc-950/10 dark:bg-white/10')} />;
}

export function NavbarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const id = useId();

  return (
    <div role="menubar" aria-labelledby={id} {...props} className={clsx(className, 'flex gap-4')}>
      {props.children}
    </div>
  );
}

export function NavbarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'flex-1')} />;
}

interface NavbarItemProps extends React.ComponentPropsWithoutRef<'div'> {
  current?: boolean;
}

export const NavbarItem = React.forwardRef<HTMLDivElement, NavbarItemProps>(
  function NavbarItem({ ref, current = false, className, children, ...props }, forwardedRef) {
    return (
      <div
        ref={forwardedRef}
        role="menuitem"
        aria-current={current ? 'page' : undefined}
        {...props}
        className={clsx(className, 'relative flex items-center gap-2')}
      >
        <LayoutGroup>
          {current && (
            <motion.div
              layoutId="navbar-item-selected"
              className="absolute inset-x-0 -bottom-px h-px bg-zinc-950 dark:bg-white"
            />
          )}
          {children}
        </LayoutGroup>
      </div>
    );
  }
);

export function NavbarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'text-sm font-medium text-zinc-950 dark:text-white')} />;
}
