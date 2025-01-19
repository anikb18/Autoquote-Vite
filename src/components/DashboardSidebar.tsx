// DashboardSidebar.tsx
import React from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import { Link } from 'react-router-dom';
import { PiChartLineUpBold, PiStorefrontFill, PiCarFill, PiUserCircleFill, PiUsersFourFill } from 'react-icons/pi';

const DashboardSidebar = () => {
  const { user } = useAuth();

  const navigation = {
    admin: [
      { name: 'Dashboard', icon: PiChartLineUpBold, href: '/dashboard' },
      { name: 'Dealers', icon: PiStorefrontFill, href: '/dashboard/dealers' },
      { name: 'Users', icon: PiUsersFourFill, href: '/dashboard/users' },
    ],
    dealer: [
      { name: 'Dashboard', icon: PiChartLineUpBold, href: '/dashboard' },
      { name: 'Inventory', icon: PiCarFill, href: '/dashboard/inventory' },
    ],
    buyer: [
      { name: 'Dashboard', icon: PiChartLineUpBold, href: '/dashboard' },
      { name: 'Profile', icon: PiUserCircleFill, href: '/dashboard/profile' },
    ],
  };

  const items = navigation[user.userType] || [];

  return (
    <div className="sidebar">
      {items.map((item) => (
        <Link key={item.name} to={item.href}>
          <item.icon className="icon" />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DashboardSidebar;