import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaWallet } from 'react-icons/fa';

const Login = ({ onLogin, onLoginWithGoogle, onLoginWithMetamask }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    onLogin(event.target.username.value, event.target.password.value);
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
            <button type="button" onClick={onLoginWithGoogle} className="google-btn">
              <FaGoogle /> Login with Google
            </button>
            <button type="button" onClick={onLoginWithMetamask} className="metamask-btn">
              <FaWallet /> Login with Metamask
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;