import HomePage from "./HomePage/components/Homepage";
import Museums from "./Museums/MuseumsPage";
import Route from "./components/Route";
import HeaderBar from "./components/HeaderBar";
import { NavigationProvider } from "./context/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import MuseumDetail from "./Museums/MuseumDetail";
import EveryArtworkPage from "./pages/EveryArtworkPage";



function App() {
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
            <Museums />
          </Route>
        </div>
      </div>
    </NavigationProvider>

  );
}

export default App;
