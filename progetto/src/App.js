import HomePage from "./HomePage/components/Homepage";
import Museums from "./Museums/MuseumsPage";
import Route from "./components/Route";
import HeaderBar from "./components/HeaderBar";
import { NavigationProvider } from "./context/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import MuseumDetail from "./Museums/MuseumDetail";
import EveryArtworkPage from "./pages/EveryArtworkPage";
import EventsPage from "./MyEvents/EventsPage";
import HandleEventsPage from "./pages/HandleEventsPage";
import PersonalGalleryPage from "./pages/PersonalGalleryPage";
import ArtworkDetails from "./components/ArtworkDetails";
import { useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/Login"


function App() {

  const [search, setSearch] = useState("");

  const handleSearch = (text) => {
    console.log("INSERITO: ", text)
    setSearch(text);
  }

  const handleResetSearch = () => {
    console.log("Ricerca Effettuata!")
    setSearch("")
  }

  useEffect(() => {
    console.log("Ricerca: ", search);
  }, [search]);
  // writeUserData(5, "fdedg");
  return (

    <NavigationProvider>
      <div>
        <LoginPage/>
        <HeaderBar />
        <div>
          <Route path="/">
            <HomePage onSearch={handleSearch} onReset={handleResetSearch} />
          </Route>
          <Route path="/everyArtwork">
            <EveryArtworkPage onSearch={handleSearch} onReset={handleResetSearch} search={search} />
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
            <ArtworkDetails />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </div>
      </div>
    </NavigationProvider>

  );
}

export default App;
