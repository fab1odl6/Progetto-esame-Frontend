import React from "react";
import EventSlideShow from "./EventSlideShow";
import ArtSlideShow from "./ArtSlideShow";
import SearchBar from "../../components/SearchBar";
import { useDispatch } from "react-redux";
import { clearText } from "../store";


function HomePage() {

    const zIndexClass = 'z-10';

    const dispatch = useDispatch();
    dispatch(clearText());

    return (
        <div>
            <div className={zIndexClass}>
                <SearchBar />
            </div>
            <EventSlideShow />
            <ArtSlideShow />
        </div>
    )
}

export default HomePage;
