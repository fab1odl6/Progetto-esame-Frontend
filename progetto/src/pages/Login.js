import React, { useState, useContext } from 'react';
import HomePage from '../HomePage/components/Homepage';
import NavigationContext from '../context/navigation';
import { getDatabase, ref, get, child } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user';
import { setLogged } from '../HomePage/store';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../components/FirebaseConfig';


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

async function getArts(user) {
  const artArray = [];
  const artRef = child(dbRef, "/users/" + user.name + "/artworks");

  try {
    const snapshot = await get(artRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        const art = data[key];
        artArray.push({
          id: art.id,
          link: art.link,
          authorName: art.authorName,
          title: art.title,
          image: art.image,
          department: art.department,
          culture: art.culture,
          period: art.period,
          date: art.date,
          dimensions: art.dimensions,
          city: art.city,
          state: art.state,
          country: art.country,
          classification: art.classification,
          favorite: art.favorite,
          full: art.full,
          type: art.type
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
  artArray.map(art => console.log(art))
  return artArray;
}

async function getEvents(user) {
  const eventArray = [];
  const eventRef = child(dbRef, "/users/" + user.name + "/events");

  try {
    const snapshot = await get(eventRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        const event = data[key];
        eventArray.push({
          id: event.id,
          name: event.name,
          image: event.image,
          date: event.date,
          department: event.department,
          guests: event.guests,
          favorite: event.favorite,
          full: event.full
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
  return eventArray;
}

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
        const artworks = await getArts(matchedUser);
        const events = await getEvents(matchedUser);
        dispatch(setUser({ matchedUser, artworks, events }));
        console.log('Utente loggato:', matchedUser);
        setLoggedIn(true);
        dispatch(setLogged());
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
