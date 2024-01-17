import ArtGrid from "../components/ArtGrid"
import FilterList from "../components/FilterList";
import SearchBar from '../components/SearchBar';
import { useSelector } from "react-redux";

function EveryArtworkPage({ onSearch, onReset, search }) {

    const { array } = useSelector((state) => {
        return state.artworks;
    });
    const filtersState = useSelector((state) => state.filters);

    const filteredArray = array.filter((element) => {
        const matchesTitle = !search || element.title.toLowerCase().includes(search.toLowerCase());
        if(!search){onReset();}
        const matchesAuthor = filtersState.filterInput.length === 0 || filtersState.filterInput.some(input => element.authorName.includes(input));
        const matchesType = filtersState.filterSelection.length === 0 || filtersState.filterSelection.some(input => element.type.includes(input));
        const matchesDate = filtersState.filterSlider.length === 0 || filtersState.filterSlider.some(input => element.date.toString() === input);
        const matchesNationality = filtersState.filterCheckbox.length === 0 || filtersState.filterCheckbox.some(input => element.country.includes(input));

        return matchesAuthor && matchesType && matchesNationality && matchesDate && matchesTitle
    });

    /*
    const FilterSelectionHandler = () => {
        const filtersState = useSelector((state) => state.search);
        console.log("Stato corrente:", filtersState);
        return null;
    };
    */

    return(      
        <div>
            <div className='z-40 relative'>
                <SearchBar onSearch={onSearch}/>
            </div>
            <div className="z-30 relative">
                <FilterList artworks={array} />
            </div>
            {search && search.trim() !== '' && (
                <div className="z-20 relative">
                    <p className="text-lg font-bold mt-4">Results for: {search}</p>
                </div>
            )}
            <div className="z-20 relative">
                <ArtGrid artworks={filteredArray} />
            </div>
        </div> 
    )
}

export default EveryArtworkPage;