/* eslint-disable */
import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import AuthReducer from './AuthReducer';

export const AuthContext = createContext({});

const AuthContextProvider = ({ children, }: { children: any }) => {
  const [authContext, authDispatch] = useReducer(AuthReducer, {}, () => {
    const authData = localStorage.getItem('job-app:auth');
    return authData ? JSON.parse(authData) : {};
  });

  return (
    <AuthContext.Provider value={{ authContext, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
