import SearchIcon from '@mui/icons-material/Search';
import ArtGrid from "../components/ArtGrid"
import FilterList from "../components/FilterList";
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function EveryArtworkPage({ onSearch, onReset, search }) {

    const [filters, setFilters] = useState({
        filterInput: [],
        filterSelection: [],
        filterSlider: [],
        filterCheckbox: [],
    });

    const { array } = useSelector((state) => {
        return state.artworks;
    });

    const filteredArray = array.filter((element) => {

        const matchesTitle = !search || element.title.includes(search);
        if(!search){onReset();}
        console.log(matchesTitle)

        // Logica di filtro...
        const matchesAuthor = filters.filterInput.length === 0 || filters.filterInput.some(input => element.authorName.includes(input));
        const matchesType = filters.filterSelection.length === 0 || filters.filterSelection.some(input => element.type.includes(input));
        const matchesDate = filters.filterSlider.length === 0 || filters.filterSlider.some(input => element.date.toString() === input);
        const matchesNationality = filters.filterCheckbox.length === 0 || filters.filterCheckbox.some(input => element.country.includes(input));
        return matchesAuthor && matchesType && matchesNationality && matchesDate && matchesTitle
    });

    useEffect(() => {
        console.log("FILTRATO: ", filteredArray);
    }, [array, filters, filteredArray]);

    const handleInput = (filterValue, filterName) => {
        setFilters((prevFilters) => {
            if(!prevFilters[filterName].includes(filterValue)) {
                return {
                    ...prevFilters,
                    [filterName]: [...prevFilters[filterName],filterValue],
                }
            }
            return prevFilters;
        })
    }

    const removalHandle = (elementToRemove,filterName) => {
        setFilters((prevFilters) => {
            // Filtra gli elementi diversi da elementToRemove
            const updatedFilter = prevFilters[filterName].filter(
                (element) => element !== elementToRemove
            );   
            return {
                ...prevFilters,
                [filterName]: updatedFilter,
            };
        });
    };

    return(      
        <div>
            <div className='z-100'>
                <SearchBar onSearch={onSearch}/>
            </div>
            <div className="z-50 relative">
                <FilterList artworks={array} filters={filters} handleInput={handleInput} removalHandle={removalHandle}/>
            </div>
            <div className="z-40 relative">
                <ArtGrid artworks={filteredArray} />
            </div>
        </div> 
    )
}

export default EveryArtworkPage;