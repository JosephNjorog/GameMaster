import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ isAuthenticated: false, login: () => {}, logout: () => {} });

export const useAuth = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  return { isAuthenticated, login, logout };
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};