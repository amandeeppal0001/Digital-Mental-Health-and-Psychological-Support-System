import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This is a simplified auth check. In a real app, you'd use a context.
const useAuth = () => {
  // Replace this with your actual auth logic (e.g., from context, Redux)
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    return { isAuthenticated: true, role: user.role };
  }
  return { isAuthenticated: false, role: null };
};

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();
    
    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to home or an 'unauthorized' page if role doesn't match
        return <Navigate to="/" replace />;
    }

    // If authenticated and authorized, render the child components
    return <Outlet />;
};

export default PrivateRoute;
