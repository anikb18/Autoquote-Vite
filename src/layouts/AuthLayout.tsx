import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/Auth/AuthProvider';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useTranslation } from 'react-i18next';

export function AuthLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { i18n } = useTranslation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page with the return url
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <DashboardSidebar locale={i18n.language} userType={user.user_metadata?.type || 'buyer'} />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
