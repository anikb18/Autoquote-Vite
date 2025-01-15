'use client';

import { Navbar as CatalystNavbar, NavbarItem, NavbarSection } from '@/components/Catalyst/navbar';
import { UserButton } from '@clerk/nextjs';

interface Props {
  title: string;
}

export function Navbar({ title }: Props) {
  return (
    <CatalystNavbar>
      <NavbarSection>
        <NavbarItem>
          <h1 className="text-xl font-semibold">{title}</h1>
        </NavbarItem>
      </NavbarSection>
      <NavbarSection className="ml-auto">
        <NavbarItem>
          <UserButton afterSignOutUrl="/login" />
        </NavbarItem>
      </NavbarSection>
    </CatalystNavbar>
  );
}
