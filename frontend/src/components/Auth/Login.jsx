import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login, loginWithGoogle, loginWithMetamask } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await login(email.value, password.value);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={loginWithMetamask}>Login with Metamask</button>
    </div>
  );
};

export default Login;
