import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaWallet } from 'react-icons/fa';

const Signup = ({ onSignup, onSignupWithGoogle, onSignupWithMetamask }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    onSignup(
      event.target.username.value,
      event.target.email.value,
      event.target.password.value
    );
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
          <h2>Sign Up</h2>
          <div className="inputBox">
            <input type="text" required name="username" />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="email" required name="email" />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="password" required name="password" />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="#">Already have an account?</a>
            <a href="#">Login</a>
          </div>
          <input type="submit" value="Sign Up" />
          <div className="social-login">
            <button type="button" onClick={onSignupWithGoogle} className="google-btn">
              <FaGoogle /> Sign up with Google
            </button>
            <button type="button" onClick={onSignupWithMetamask} className="metamask-btn">
              <FaWallet /> Sign up with Metamask
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;