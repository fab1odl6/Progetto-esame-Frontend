import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import HomePage from '../HomePage/components/Homepage';
import { useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <LoginPage />
        <ConditionalHomePage />
      </div>
    </Router>
  );
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        border: '1px solid #ddd',
        borderRadius: '10px', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
      },
      title: {
        fontWeight: 'bold',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '20px',
      },
      formGroup: {
        marginBottom: '15px',
      },
      label: {
        marginBottom: '5px',
      },
      input: {
        padding: '8px',
        fontSize: '16px',
      },
      button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#af874c',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      },
    };

    const ConditionalHomePage = () => {
        const [isLoggedIn, setLoggedIn] = useState(false);
      
        if (isLoggedIn) {
          return <HomePage />;
        }
      
        return null; // Puoi anche renderizzare altro (ad esempio, un messaggio di benvenuto)
      };
      
    export default App;
    