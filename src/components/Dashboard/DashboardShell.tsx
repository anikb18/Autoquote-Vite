'use client';

'use client';

import { Navbar } from '@/components/Catalyst/navbar';
import { SidebarLayout } from '@/components/Catalyst/sidebar-layout';
import { usePathname } from 'next/navigation';

interface DashboardShellProps {
  children: React.ReactNode;
  userType: string;
}

export function DashboardShell({ children, userType }: DashboardShellProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <SidebarLayout
      navbar={<Navbar />}
    >
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </SidebarLayout>
  );
}
