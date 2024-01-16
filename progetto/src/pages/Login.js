import React, { useState, useContext } from 'react';
import HomePage from '../HomePage/components/Homepage';
import NavigationContext from '../context/navigation';
import { getDatabase, ref, get, child } from 'firebase/database';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false); 
  const { navigate } = useContext(NavigationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    const database = getDatabase();
    const usersRef = ref(database, 'users');

    try {
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      const matchedUser = Object.values(users).find(user => user.username === username && user.password === password);

      if (matchedUser) {
        setLoggedIn(true);
        navigate('/');
      } else {

        console.error('Username o Password Errati, riprovare');

        setUsername('');
        setPassword('');
      }
    } catch (error) {
      // Gestisci l'errore, ad esempio, loggando l'errore sulla console
      console.error('Errore durante la verifica dell\'utente:', error);
    }
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
      
    export default LoginPage;
    