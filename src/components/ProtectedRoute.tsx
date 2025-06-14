
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PageLoader from '@/components/loading/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'admin' | 'recruiter' | 'candidate';
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <PageLoader text="Authenticating..." />;
  }

  if (!user || !session) {
    return <PageLoader text="Redirecting to login..." />;
  }

  // TODO: Add role-based access control here when user profile is fetched
  // if (requireRole && userProfile?.role !== requireRole) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
