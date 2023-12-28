import React from "react";
import SearchIcon from '@mui/icons-material/Search';

function HomePage() {



    return (
        <div>
            <div className="sectionHeader">
                <div className="sectionElement">Homepage</div>
                <div className="sectionElement">Every Artwork</div>
                <div className="sectionElement">Museums</div>
                <div className="sectionElement">Personal Gallery</div>
                <div className="sectionElement">My Events</div>
            </div>
            <div className="searchBarHeader">
                <div className="searchBar">
                    Cerca ...
                    <SearchIcon className="searchIcon" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;
