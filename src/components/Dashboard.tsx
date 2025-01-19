// Dashboard.tsx
import React from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import AdminDashboard from './AdminDashboard';
import DealerDashboard from './DealerDashboard';
import BuyerDashboard from './BuyerDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  switch (user.userType) {
    case 'admin':
      return <AdminDashboard />;
    case 'dealer':
      return <DealerDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    default:
      return <Navigate to="/sign-in" />;
  }
};

export default Dashboard;