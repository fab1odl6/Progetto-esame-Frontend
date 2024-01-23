import React from "react";
import EventSlideShow from "../components/events/EventSlideShow";
import ArtSlideShow from "../components/artworks/ArtSlideShow";
import SearchBar from "../components/header & footer/SearchBar";
import { useDispatch } from "react-redux";
import { clearText } from "../store";
import { useEffect } from "react";


function HomePage() {

    const zIndexClass = 'z-10';
    const zIndexEvent = 'z-50 mb-3 mt-3';
    const zIndexArt = 'z-50 mt-3';

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(clearText());
      }, []);

    return (
        <div>
            <div className={zIndexClass}>
                <SearchBar />
            </div>
            <div className={zIndexEvent}>
                <EventSlideShow />
            </div>
            <div className={zIndexArt}>
                <ArtSlideShow />
            </div>
        </div>
    )
}

export default HomePage;
