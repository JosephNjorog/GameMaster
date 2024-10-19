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
import Chess from './components/games/Chess';
import Ludo from './components/games/Ludo';
import Scrabble from './components/games/Scrabble';
import Draft from './components/games/Draft';
import PaymentForm from './components/PaymentForm';
import './App.css';
import './components/Auth/Auth.css';  // Renamed CSS file to Auth.css

// Stripe initialization
const stripePromise = loadStripe('your-publishable-key-here');

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// App content component
const AppContent = () => {
  const { user, login, signup, loginWithGoogle, loginWithMetamask } = useAuth();

  const handleLogin = (username, password) => {
    login(username, password);
  };

  const handleSignup = (username, email, password) => {
    signup(username, email, password);
  };

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={
                <AnimatedLogin 
                  onLogin={handleLogin}
                  onLoginWithGoogle={loginWithGoogle}
                  onLoginWithMetamask={loginWithMetamask}
                />
              } />
              <Route path="/signup" element={
                <AnimatedSignup 
                  onSignup={handleSignup}
                  onSignupWithGoogle={loginWithGoogle}
                  onSignupWithMetamask={loginWithMetamask}
                />
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard user={user} />
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

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <ToasterProvider>
        <AppContent />
      </ToasterProvider>
    </AuthProvider>
  );
};

export default App;