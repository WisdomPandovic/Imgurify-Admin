import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    return <Route {...rest} element={element} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
