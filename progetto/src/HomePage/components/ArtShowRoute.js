import ArtworkDetails from "../../components/ArtworkDetails";
import Route from "../../components/Route";
import { NavigationProvider } from "../../context/navigation";
import ArtShow from "./ArtShow";

function ArtFullShow() {

    return (
        <NavigationProvider>
            <Route path="/">
                <ArtShow />
            </Route>
            <Route path="/artworkDetails">
                <ArtworkDetails />
            </Route>
        </NavigationProvider>
    )
}

export default ArtFullShow;
