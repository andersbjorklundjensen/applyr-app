import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../state/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authContext } = useContext(AuthContext);

  if (!authContext.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
