import SearchIcon from '@mui/icons-material/Search';
import className from "classnames";

function SearchBar() {

    const searchBarHeader = className("justify-center align-center flex");
    const searchBar = className("mt-5 border-1 h-1/6 w-5/6 text-gray-500 justify-between flex");
    const searchIcon = className("self-end mb-6");

    return (
        <div className={searchBarHeader}>
            <div className={searchBar}>
                Cerca ...
                <SearchIcon className={searchIcon} />
            </div>
        </div>
    )

}

export default SearchBar;