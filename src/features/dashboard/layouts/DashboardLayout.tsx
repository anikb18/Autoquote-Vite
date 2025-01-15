import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useTranslation } from 'react-i18next';

export default function DashboardLayout() {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border">
        <DashboardSidebar 
          locale={i18n.language} 
          userType={user?.user_metadata?.type || 'buyer'} 
        />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
