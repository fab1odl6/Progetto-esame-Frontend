import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import EventSlideShow from "./EventSlideShow";
import ArtSlideShow from "./ArtSlideShow";
import className from "classnames";
import SearchBar from "../../components/SearchBar";
import { useDispatch } from "react-redux";
import { clearText } from "../store";


function HomePage() {

    const dispatch = useDispatch();
    dispatch(clearText());

    return (
        <div>
            <div className='z-10'>
                <SearchBar/>
            </div>
            <EventSlideShow />
            <ArtSlideShow />
        </div>
    )
}

export default HomePage;
