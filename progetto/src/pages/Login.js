import React, { useState, useContext, useEffect } from 'react';
import HomePage from './Homepage';
import NavigationContext from '../context/navigation';
import { getDatabase, ref, get, child } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUser, setLogged, logoutUser, clearText, setPage } from '../store';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../components/firebase/FirebaseConfig';


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

async function getCustomEvents(user) {
  const eventArray = [];
  const eventRef = child(dbRef, "/users/" + user.name + "/customEvents");

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
          favorite: false,
          full: false
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
  return eventArray;
}


const LoginPage = function () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const { navigate } = useContext(NavigationContext);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  const handleLogout = () => {
    // Dispatch l'azione di logout
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(`Username: ${username}, Password: ${password}`);

    const usersRef = ref(db, "users/");

    try {
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        console.log(users);

        if (users) {
          const matchedUser = Object.values(users).find(u =>
            u.personalData.username.toLowerCase() === username.toLowerCase() && u.personalData.password === password
          );

          if (matchedUser) {
            console.log('Utente loggato:', matchedUser);
            const artworks = await getArts(matchedUser.personalData);
            const events = await getEvents(matchedUser.personalData);
            const customEvents = await getCustomEvents(matchedUser.personalData);
            dispatch(setUser({ matchedUser, artworks, events, customEvents }));
            dispatch(setLogged(true));
            setLoggedIn(true);
            console.log('isLoggedIn dopo il login:', true);
            navigate('/');
            dispatch(setPage("HomePage"));
          } else {
            setError('Username o Password Errati, riprovare');
            setUsername('');
            setPassword('');
            setLoggedIn(false); // Imposta isLoggedIn a false in caso di login non riuscito
          }
        } else {
          setError('Dati utente non validi');
        }
      }
    } catch (error) {
      console.error('Errore durante la verifica dell\'utente:', error);
      setError('Si è verificato un errore durante la verifica dell\'utente');
    }

    console.log('Fine della funzione handleLogin');
  };

  useEffect(() => {
    console.log('isLoggedIn dopo il login:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://media-assets.wired.it/photos/632873a16d787d7fa7f012b8/4:3/w_1820,h_1365,c_limit/The%CC%81a%CC%82tre_D%E2%80%99ope%CC%81ra_Spatial.jpeg')" }}>
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src="https://cdn.icon-icons.com/icons2/1364/PNG/512/publicmuseumsign_89226.png" width="150" alt="" />
            <h1 className="mb-2 text-2xl">ArtTreasures</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
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
