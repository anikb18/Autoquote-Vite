import { Outlet } from 'react-router-dom';
import { DashboardClient } from './DashboardClient';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useAuth } from '../providers/AuthProvider';
import { useEffect } from 'react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { viewMode } = useViewMode();
  const { user } = useAuth();

  useEffect(() => {
    console.log('DashboardLayout - Current state:', { viewMode, user });
  }, [viewMode, user]);

  return (
    <DashboardClient>
      {children || <Outlet />}
    </DashboardClient>
  );
};

export default DashboardLayout;
