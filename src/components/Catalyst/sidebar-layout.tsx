'use client'

import * as Headless from '@headlessui/react'
import React, { useState } from 'react'
import { NavbarItem } from './navbar'
import cn from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

function OpenMenuIcon() {
  return (
    <svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" className="w-3 h-3">
      <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
    </svg>
  )
}

function CloseMenuIcon() {
  return (
    <svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" className="w-3 h-3">
      <path d="m1.5 1 7 7M8.5 1l-7 7" />
    </svg>
  )
}

function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <Headless.Dialog open={open} onClose={close} className="lg:hidden">
      <Headless.Dialog.Backdrop className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
      <div className="fixed inset-0 flex">
        <Headless.Dialog.Panel className="flex w-full max-w-xs flex-1">
          <div className="flex flex-grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
            <div className="flex h-16 shrink-0 items-center">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-white"
                onClick={close}
              >
                <span className="sr-only">Close sidebar</span>
                <CloseMenuIcon />
              </button>
            </div>
            {children}
          </div>
        </Headless.Dialog.Panel>
      </div>
    </Headless.Dialog>
  )
}

interface SidebarLayoutComposition {
  Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Main: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}
export const SidebarLayout: React.FC<React.PropsWithChildren> & SidebarLayoutComposition = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Clone children and pass isCollapsed prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === SidebarLayout.Sidebar) {
      return React.cloneElement(child, { isCollapsed });
    }
    return child;
  });

  return (
    <div className="relative isolate flex min-h-svh">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed left-0 top-4 z-[60] ml-64 rounded-r-lg bg-white p-1.5 shadow-md hover:bg-gray-50 transition-transform duration-300 ${
          isCollapsed ? 'translate-x-[-16rem]' : ''
        }`}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {childrenWithProps}
    </div>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

SidebarLayout.Sidebar = function Sidebar({ children, className, isCollapsed, ...props }: SidebarProps) {
  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-gray-200 bg-white shadow-sm transition-transform duration-300",
        isCollapsed ? '-translate-x-64' : 'translate-x-0',
        className
      )} 
      {...props}
    >
      <div className="flex h-full flex-col">
        {children}
      </div>
    </div>
  )
}

SidebarLayout.Main = function Main({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main className={cn("relative flex-1 lg:pl-64 transition-all duration-300", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  )
}