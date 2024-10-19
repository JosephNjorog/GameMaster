import React, { createContext, useContext, useState } from 'react';

// Create Auth context
const AuthContext = createContext();

// AuthProvider component to provide auth state and functions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Dummy login implementation
    if (username === 'Joseph' && password === '12345678') {
      setUser({ username: 'Joseph', token: 'dummy-token' });
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const signup = (username, email, password) => {
    // Dummy signup implementation
    setUser({ username, email, token: 'dummy-token' });
  };

  const logout = () => {
    setUser(null);
  };

  const loginWithGoogle = () => {
    // Dummy Google login implementation
    setUser({ username: 'GoogleUser', token: 'google-dummy-token' });
  };

  const loginWithMetamask = () => {
    // Dummy Metamask login implementation
    setUser({ username: 'MetamaskUser', token: 'metamask-dummy-token' });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loginWithMetamask }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
