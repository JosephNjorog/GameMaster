import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaWallet } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext.js';

const Login = () => {
  const { login, loginWithGoogle, loginWithMetamask, error } = useAuth();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      // Call the login function with username and password
      await login(username, password);
    } catch (err) {
      // Set local error message if login fails
      setLocalError(err.message);
    }
  };

  return (
    <div className="holder">
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2>Sign in</h2>
          {error && <div className="error-message">{error}</div>}
          {localError && <div className="error-message">{localError}</div>}
          <div className="inputBox">
            <input type="text" required name="username" />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="password" required name="password" />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="#">Forgot Password ?</a>
            <a href="#">Signup</a>
          </div>
          <input type="submit" value="Login" />
          <div className="social-login">
            <button type="button" onClick={loginWithGoogle} className="google-btn">
              <FaGoogle /> Login with Google
            </button>
            <button type="button" onClick={loginWithMetamask} className="metamask-btn">
              <FaWallet /> Login with Metamask
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
