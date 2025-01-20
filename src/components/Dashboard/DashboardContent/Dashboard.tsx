import React from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import AdminDashboard from '@/components/Dashboard/AdminDashboard/AdminDashboard';
import DealerDashboard from '@/components/Dashboard/DealerDashboard/DealerDashboard';
import UserDashboard from '@/components/Dashboard/UserDashboard/UserDashboard';

const Dashboard = () => {
  const { user, userRole, loading, error } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userRole) {
    return <div>Access denied. No role assigned.</div>;
  }

  switch (userRole.toLowerCase()) {
    case 'admin':
      return <AdminDashboard />;
    case 'dealer':
      return <DealerDashboard />;
    case 'user':
      return <UserDashboard user={user} />;
    default:
      return <div>Invalid user role: {userRole}</div>;
  }
};

export default Dashboard;