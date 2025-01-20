// Dashboard.tsx
import React from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import AdminDashboard from '@/components/Dashboard/AdminDashboard/AdminDashboard';
import DealerDashboard from '@/components/Dashboard/DealerDashboard/DealerDashboard';
import UserDashboard from '@/components/Dashboard/UserDashboard/UserDashboard';
import { getSupabaseClient } from '@/lib/supabase';

const Dashboard = () => {
  const { user } = useAuth();

  console.log('Dashboard - user role:', user?.user_metadata?.role);

  switch (user?.user_metadata?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'dealer':
      return <DealerDashboard />;
    case 'user':
      return <UserDashboard user={user} />;
    default:
      return null;
  }
};

export default Dashboard;
