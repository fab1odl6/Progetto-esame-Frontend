import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import EventSlideShow from "./EventSlideShow";
import ArtSlideShow from "./ArtSlideShow";


function HomePage() {

    return (
        <div>
            <div className="searchBarHeader">
                <div className="searchBar">
                    Cerca ...
                    <SearchIcon className="searchIcon" />
                </div>
            </div>
            <EventSlideShow />
            <ArtSlideShow />
        </div>
    )
}

export default HomePage;
