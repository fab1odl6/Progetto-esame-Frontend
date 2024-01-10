import HomePage from "./HomePage/components/Homepage";
import Museums from "./Museums/MuseumsPage";
import Route from "./components/Route";
import HeaderBar from "./components/HeaderBar";
import { NavigationProvider } from "./context/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import MuseumDetail from "./Museums/MuseumDetail";
import EveryArtworkPage from "./pages/EveryArtworkPage";
import addAnEvent from "./pages/AddAnEvent";
import AddAnEvent from "./pages/AddAnEvent";
import EventsPage from "./MyEvents/EventsPage";

/*import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, child, set } from "firebase/database";
import { firebaseConfig } from "./components/TestFirebase";

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());


get(child(dbRef, '/users')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


function writeUserData(userId, name) {
  const db = getDatabase();
  set(ref(db, 'users/user ' + userId), {
    id: userId,
    name: name
  });
}
*/

function App() {
  // writeUserData(5, "fdedg");
  return (

    <NavigationProvider>
      <div>
        <HeaderBar />
        <div>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/everyArtwork">
            <EveryArtworkPage />
          </Route>
          <Route path="/museums">
            <Museums />
          </Route>
          <Route path="/personalGallery">
            <Museums />
          </Route>
          <Route path="/myEvents">
            <EventsPage />
          </Route>
          <Route path="/addAnEvent">
            <AddAnEvent />
          </Route>
        </div>
      </div>
    </NavigationProvider>

  );
}

export default App;
