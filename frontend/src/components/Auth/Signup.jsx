import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = ({ onSignup, onSignupWithGoogle, onSignupWithMetamask }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Handle form submission
      await onSignup(
        event.target.username.value,
        event.target.email.value,
        event.target.password.value
      );
      // Redirect to login after successful signup
      navigate('/login'); // Navigate to login page
    } catch (error) {
      // Handle error if signup fails (optional)
      console.error("Signup failed: ", error.message);
    }
  };

  // Function to handle redirect to login page
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
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
            <button type="button" onClick={handleLoginRedirect}>Already have an account? Login</button>
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
