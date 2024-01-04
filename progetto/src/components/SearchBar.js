import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {

    return(
        <div className="searchBarHeader">
            <div className="searchBar">
                Cerca ...
                <SearchIcon className="searchIcon" />
            </div>
        </div>
    )

}

export default SearchBar;