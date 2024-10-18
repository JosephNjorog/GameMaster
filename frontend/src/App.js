import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Chess from './components/games/Chess';
import Ludo from './components/games/Ludo';
import Scrabble from './components/games/Scrabble';
import Draft from './components/games/Draft';
import PaymentForm from './components/PaymentForm.jsx';
import './App.css';

const stripePromise = loadStripe('your-publishable-key-here');

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock user login
    setUser({ id: 1, firstName: 'Joseph' });
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/games/chess" element={<Chess />} />
              <Route path="/games/ludo" element={<Ludo />} />
              <Route path="/games/scrabble" element={<Scrabble />} />
              <Route path="/games/draft" element={<Draft />} />
              <Route path="/payment" element={<PaymentForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Elements>
  );
};

export default App;
