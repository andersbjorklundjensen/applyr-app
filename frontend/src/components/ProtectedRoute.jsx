import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../state/auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authContext } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={
      (props) => {
        if (authContext.token) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }
    }
    />
  );
};

export default ProtectedRoute;
