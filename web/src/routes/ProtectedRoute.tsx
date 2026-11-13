import { Navigate, Outlet } from 'react-router-dom';

export type UserRole = 'ALUMNO' | 'DOCENTE' | 'ADMIN';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({
  isAuthenticated,
  userRole,
  allowedRoles,
}: ProtectedRouteProps) => {
  if (!isAuthenticated || !userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />;
};