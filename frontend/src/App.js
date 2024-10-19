import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToasterProvider } from './components/ui/toaster';
import { AuthProvider, useAuth } from './components/contexts/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './components/Auth/ResetPassword';
import Games from './components/Games';
import Chess from './components/games/Chess';
import Ludo from './components/games/Ludo';
import Scrabble from './components/games/Scrabble';
import Draft from './components/games/Draft';
import PaymentForm from './components/PaymentForm';
import Profile from './components/Profile'; // Import the Profile component
import './App.css';
import './components/Auth/Auth.css';  // Ensure this file exists and has the necessary styles

// Initialize Stripe
const stripePromise = loadStripe('your-publishable-key-here');

// ProtectedRoute component to protect certain routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// AppContent component handling routing and main content
const AppContent = () => {
  const { user, login, signup, loginWithGoogle, loginWithMetamask } = useAuth();

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSignup = async (username, email, password) => {
    try {
      await signup(username, email, password);
      return <Navigate to="/login" replace />;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={
                <Login 
                  onLogin={handleLogin}
                  onLoginWithGoogle={loginWithGoogle}
                  onLoginWithMetamask={loginWithMetamask}
                />
              } />
              <Route path="/signup" element={
                <Signup 
                  onSignup={handleSignup}
                  onSignupWithGoogle={loginWithGoogle}
                  onSignupWithMetamask={loginWithMetamask}
                />
              } />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/games" element={
                <ProtectedRoute>
                  <Games />
                </ProtectedRoute>
              } />
              <Route path="/games/chess" element={
                <ProtectedRoute>
                  <Chess />
                </ProtectedRoute>
              } />
              <Route path="/games/ludo" element={
                <ProtectedRoute>
                  <Ludo />
                </ProtectedRoute>
              } />
              <Route path="/games/scrabble" element={
                <ProtectedRoute>
                  <Scrabble />
                </ProtectedRoute>
              } />
              <Route path="/games/draft" element={
                <ProtectedRoute>
                  <Draft />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <PaymentForm />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </Elements>
  );
};

// Main App component providing context providers
const App = () => (
  <AuthProvider>
    <ToasterProvider>
      <AppContent />
    </ToasterProvider>
  </AuthProvider>
);

export default App;
