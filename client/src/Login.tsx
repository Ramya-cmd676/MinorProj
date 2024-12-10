import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/api/login', {
        params: { username, password },
      });

      if (response.data.success) {
        setMessage('Login successful!');
        setIsLoggedIn(true); // Set login state to true
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login. Please try again later.');
    }
  };

  // Conditionally render Home or Login based on login state
  if (isLoggedIn) {
    return <Home />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
