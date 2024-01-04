import SearchIcon from '@mui/icons-material/Search';
import ArtGrid from "../components/ArtGrid"
import FilterList from "../components/FilterList";
import SearchBar from '../components/SearchBar';

function EveryArtworkPage() {

    return(
        
        <div>
            <SearchBar />
            <div className="filterOptions">
                <FilterList />
            </div>
            <div className="artGrid">
                <ArtGrid />
            </div>
        </div>
        
    )
}

export default EveryArtworkPage;