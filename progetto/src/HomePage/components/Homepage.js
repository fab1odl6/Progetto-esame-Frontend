import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import EventSlideShow from "./EventSlideShow";
import ArtSlideShow from "./ArtSlideShow";
import className from "classnames";
import SearchBar from "../../components/SearchBar";


function HomePage({ onSearch }) {

    const searchBarHeader = className("justify-center align-center flex");
    const searchBar = className("mt-5 border-1 h-1/6 w-5/6 text-gray-500 justify-between flex");
    const searchIcon = className("self-end mb-6");

    return (
        <div>
            <div className='z-10'>
                <SearchBar onSearch={ onSearch }/>
            </div>
            <EventSlideShow />
            <ArtSlideShow />
        </div>
    )
}

export default HomePage;
