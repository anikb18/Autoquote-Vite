import { useAuth } from '@/features/auth/AuthProvider';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import md5 from 'md5';

const Sidebar = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Fetch Gravatar URL
  useEffect(() => {
    if (user?.email) {
      const hash = md5(user.email.toLowerCase().trim());
      const url = `https://www.gravatar.com/avatar/${hash}?d=404`;
      setAvatarUrl(url);
    }
  }, [user?.email]);

  const isAdmin = user?.user_metadata?.role === 'admin';
  const isDealer = user?.user_metadata?.role === 'dealer';
  const isUser = user?.user_metadata?.role === 'user';

  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        {isAdmin && (
          <>
            <li><Link to="/admin/dashboard">Dashboard Overview</Link></li>
            <li><Link to="/admin/users">User Management</Link></li>
            <li><Link to="/admin/dealers">Dealer Management</Link></li>
            <li><Link to="/admin/reports">Reports</Link></li>
            <li><Link to="/admin/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        )}
        {isDealer && (
          <>
            <li><Link to="/dealer/dashboard">Dashboard Overview</Link></li>
            <li><Link to="/dealer/quotes">My Quotes</Link></li>
            <li><Link to="/dealer/listings">Manage Listings</Link></li>
            <li><Link to="/dealer/communication">Communication Hub</Link></li>
            <li><Link to="/dealer/analytics">Performance Analytics</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        )}
        {isUser && (
          <>
            <li><Link to="/user/dashboard">Dashboard Overview</Link></li>
            <li><Link to="/user/quotes">My Quotes</Link></li>
            <li><Link to="/user/communication">Communication Hub</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        )}
      </ul>
      {/* Gravatar at the bottom */}
      {avatarUrl && (
        <div className="avatar-container">
          <img src={avatarUrl} alt="User Avatar" className="avatar" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;