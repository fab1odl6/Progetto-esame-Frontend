import ArtworksDetailsPage from "../../pages/ArtworkDetailsPage";
import Route from "../navigation/Route";
import { NavigationProvider } from "../../context/navigation";
import ArtShow from "./ArtShow";

function ArtFullShow() {

    return (
        <NavigationProvider>
            <Route path="/">
                <ArtShow />
            </Route>
            <Route path="/artworkDetails">
                <ArtworksDetailsPage />
            </Route>
        </NavigationProvider>
    )
}

export default ArtFullShow;
