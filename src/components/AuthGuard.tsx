
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Court délai pour s'assurer que les données d'authentification sont chargées
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, isAdmin, isLoading]);

  if (isLoading || isChecking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <span className="ml-2 text-lg font-medium">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas administrateur
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
