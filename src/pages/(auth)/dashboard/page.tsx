import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import DashboardContent from './DashboardContent';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
