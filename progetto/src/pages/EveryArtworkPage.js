import SearchIcon from '@mui/icons-material/Search';
import ArtGrid from "../components/ArtGrid"
import FilterList from "../components/FilterList";
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from "react-redux";

function EveryArtworkPage() {

    const { array } = useSelector((state) => {
        return state.artworks;
    });

    //console.log("ESTERNO", array)

    return(
        
        <div>
            <SearchBar />
            <div className="filterOptions z-10 relative">
                <FilterList artworks={array}/>
            </div>
            <div className="artGrid z-9 relative">
                <ArtGrid artworks={array} />
            </div>
        </div>
        
    )
}

export default EveryArtworkPage;