'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLayoutRootProps {
  children: React.ReactNode;
}

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

interface HeaderProps {
  children: React.ReactNode;
}

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

function SidebarLayoutRoot({ children }: SidebarLayoutRootProps) {
  return <div className="min-h-screen">{children}</div>;
}

function Sidebar({ children, className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <Transition show={isOpen} as="div">
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="fixed inset-0 flex">
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-white/80 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Sidebar component for mobile */}
              <div className={cn("flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4", className)}>
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className={cn("flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4", className)}>
          {children}
        </div>
      </div>
    </>
  );
}

function Header({ children }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => SidebarLayout.Sidebar.isOpen = true}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        {children}
      </div>
    </div>
  );
}

function Main({ children, className }: MainProps) {
  return (
    <div>
      {/* Main content area */}
      <main className={cn("min-h-screen bg-gray-50/50 py-8", className)}>
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export const SidebarLayout = Object.assign(SidebarLayoutRoot, {
  Sidebar,
  Header,
  Main,
});
