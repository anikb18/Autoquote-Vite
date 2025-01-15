import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from '@/components/ui/auth-header';

interface CenteredLayoutProps {
}

export default function CenteredLayout() {
  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <main className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
