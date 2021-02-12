import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../state/auth/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
  component: Component,
  ...rest
}: {
  component: any;
  path: any;
  exact: any;
}) => {
  // @ts-ignore
  const { authContext } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (authContext.token) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

ProtectedRoute.propType = {
  component: PropTypes.any,
};

export default ProtectedRoute;
