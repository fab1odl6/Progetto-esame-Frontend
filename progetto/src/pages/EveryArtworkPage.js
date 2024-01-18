import ArtGrid from "../components/ArtGrid"
import FilterList from "../components/FilterList";
import SearchBar from '../components/SearchBar';
import { useSelector, useDispatch } from "react-redux";
import { clearText } from "../HomePage/store";
import { useEffect } from "react";
import { FaTimes } from 'react-icons/fa';

function EveryArtworkPage() {

    const { array } = useSelector((state) => {
        return state.artworks;
    });
    const dispatch = useDispatch();
    const filtersState = useSelector((state) => state.filters);
    const searchState = useSelector((state) => state.search.text);

    const filteredArray = array.filter((element) => {
        const matchesTitle = !searchState || element.title.toLowerCase().includes(searchState.toLowerCase());
        const matchesAuthor = filtersState.filterInput.length === 0 || filtersState.filterInput.some(input => element.authorName.includes(input));
        const matchesType = filtersState.filterSelection.length === 0 || filtersState.filterSelection.some(input => element.type.includes(input));
        const matchesDate = filtersState.filterSlider.length === 0 || filtersState.filterSlider.some(input => element.date.toString() === input);
        const matchesNationality = filtersState.filterCheckbox.length === 0 || filtersState.filterCheckbox.some(input => element.country.includes(input));

        return matchesAuthor && matchesType && matchesNationality && matchesDate && matchesTitle
    });

    useEffect(() => {
        if (!searchState) {
            dispatch(clearText());
        }
    }, []);

    const handleRemove = () => {
        dispatch(clearText());
    }

    return(      
        <div>
            <div className='z-40 relative'>
                <SearchBar/>
            </div>
            <div className="z-30 relative">
                <FilterList artworks={array} />
            </div>
            {searchState && searchState.trim() !== '' && (
                <div className="z-20 relative flex items-center mt-4">
                    <p className="text-lg font-bold">Results for: {searchState}</p>
                    <button className="flex items-center px-2 py-1 bg-gray-300 rounded cursor-pointer ml-3" onClick={handleRemove}>
                        <FaTimes className="ml-1" />
                        Clear
                    </button>
                </div>
            )}
            <div className="z-20 relative">
                <ArtGrid artworks={filteredArray} />
            </div>
        </div> 
    )
}

export default EveryArtworkPage;