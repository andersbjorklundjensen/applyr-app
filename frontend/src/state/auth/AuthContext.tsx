import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

interface AuthContextType {
  token: string;
  username: string;
}

interface AuthContextValue {
  authContext: AuthContextType;
  authDispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<AuthContextValue>({
  authContext: { token: '', username: '' },
  authDispatch: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
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
