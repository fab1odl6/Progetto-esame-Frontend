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
import { useSelector } from "react-redux";
import LoginPage from "./pages/Login"


function App() {

  const { user, logged } = useSelector((state) => {
    return state.users;
  })

  // writeUserData(5, "fdedg");
  return (

    <NavigationProvider>
      <div>
        <HeaderBar />
        <div>
          <Route path="/">
            <HomePage/>
          </Route>
          <Route path="/everyArtwork">
            <EveryArtworkPage/>
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
