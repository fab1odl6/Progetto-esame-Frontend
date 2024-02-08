import HomePage from "../src/pages/Homepage";
import ThematicAreasPage from "../src/pages/ThematicAreasPage";
import Route from "./components/navigation/Route";
import HeaderBar from "../src/components/header & footer/HeaderBar";
import { NavigationProvider } from "./context/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import EveryArtworkPage from "./pages/EveryArtworkPage";
import MyEventsPage from "../src/pages/MyEventsPage";
import HandleEventsPage from "./pages/HandleEventsPage";
import PersonalGalleryPage from "./pages/PersonalGalleryPage";
import ArtworksDetailsPage from "./pages/ArtworkDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/Login";
import Footer from "./components/header & footer/Footer";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, setPage } from "./store";
import PageNotFound from "./pages/PageNotFound";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const mainContainerStyle = "mt-0";

  const validPaths = [
    "/",
    "/everyArtwork",
    "/thematicAreas",
    "/personalGallery",
    "/myEvents",
    "/handleEvents",
    "/artworkDetails",
    "/register",
    "/login",
  ];

  const { page, previousPage } = useSelector((state) => {
    return state.activePage;
  });

  const isPathValid =
    validPaths.includes(page) || validPaths.includes(previousPage);

  const dispatch = useDispatch();

  return (
    <NavigationProvider>
      <HeaderBar />
      <PersistGate loading={null} persistor={persistor}>
        <div className={mainContainerStyle}>
          {!isPathValid && <PageNotFound />}
          <div>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/everyArtwork">
              <EveryArtworkPage />
            </Route>
            <Route path="/thematicAreas">
              <ThematicAreasPage />
            </Route>
            <Route path="/personalGallery">
              <PersonalGalleryPage />
            </Route>
            <Route path="/myEvents">
              <MyEventsPage />
            </Route>
            <Route path="/handleEvents">
              <HandleEventsPage />
            </Route>
            <Route path="/artworkDetails">
              <ArtworksDetailsPage
                navigateBack={() => {
                  window.history.back();
                  dispatch(setPage(previousPage));
                }}
              />
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
