import React, { useState, useContext } from 'react';
import HomePage from '../HomePage/components/Homepage';
import NavigationContext from '../context/navigation';
import { getDatabase, ref, get, child } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user';




const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false); 
  const [error, setError] = useState(null); 
  const { navigate } = useContext(NavigationContext);

  const dispatch = useDispatch();

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

        dispatch(setUser(matchedUser));
        console.log('Utente loggato:', matchedUser);
        setLoggedIn(true);
        navigate('/');
      } else {

        setError('Username o Password Errati, riprovare');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      // Gestisci l'errore, ad esempio, loggando l'errore sulla console
      console.error('Errore durante la verifica dell\'utente:', error);
    }

    console.log('Fine della funzione handleLogin');
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

        {error && (
        <div style={{ ...styles.error, display: 'block' }} onClick={() => console.log('Clicked on error:', error)}>
            {error}
        </div>
        )}


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

      error: {
        color: 'red',
        display: 'block',
        zIndex: 1000,  
        position: 'relative',
        backgroundColor: 'lightpink',
      },
    };

    const ConditionalHomePage = () => {
        const [isLoggedIn, setLoggedIn] = useState(false);
        console.log('isLoggedIn:', isLoggedIn);
      
        if (isLoggedIn) {
          return <HomePage />;
        }
      
        return "Benvenuto!"; // Puoi anche renderizzare altro (ad esempio, un messaggio di benvenuto)
      };
      
    export default LoginPage;
    