import HomePage from "../src/pages/Homepage";
import Museums from "../src/pages/MuseumsPage";
import Route from "./components/navigation/Route";
import HeaderBar from "../src/components/header & footer/HeaderBar";
import { NavigationProvider } from "./context/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import EveryArtworkPage from "./pages/EveryArtworkPage";
import EventsPage from "../src/pages/EventsPage";
import HandleEventsPage from "./pages/HandleEventsPage";
import PersonalGalleryPage from "./pages/PersonalGalleryPage";
import ArtworksDetailsPage from "./pages/ArtworkDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import LoginPage from "./pages/Login"
import Footer from "./components/header & footer/Footer";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";


function App() {
  

  const { user, logged } = useSelector((state) => {
    return state.users;
  })
  const mainContainerStyle = "mt-10";


  // writeUserData(5, "fdedg");
  return (

    <NavigationProvider>
      <PersistGate loading={null} persistor={persistor}>
      <div className={mainContainerStyle}>
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
            <PersonalGalleryPage />
          </Route>
          <Route path="/myEvents">
            <EventsPage />
          </Route>
          <Route path="/handleEvents">
            <HandleEventsPage />
          </Route>
          <Route path="/artworkDetails">
            <ArtworksDetailsPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </div>
        <Footer />
      </div>
     </PersistGate>
    </NavigationProvider>

  );
}

export default App;