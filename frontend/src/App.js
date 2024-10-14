import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ChessGame from './components/Game/Chess';
import LudoGame from './components/Game/Ludo';
import ScrabbleGame from './components/Game/Scrabble';
import DraftGame from './components/Game/Draft';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/chess" component={ChessGame} />
            <Route path="/ludo" component={LudoGame} />
            <Route path="/scrabble" component={ScrabbleGame} />
            <Route path="/draft" component={DraftGame} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
