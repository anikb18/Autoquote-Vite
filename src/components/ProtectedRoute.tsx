import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    // Redirect to sign-in page with return URL
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    return <Navigate to={`/sign-in?returnUrl=${returnUrl}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
