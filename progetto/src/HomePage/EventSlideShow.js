import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useState } from "react";


function EventSlideShow() {

    var eventArray = ["evento 1", "evento 2", "evento 3", "evento 4", "evento 5"];

    return (
        <div>
            <div className="highlightedEventsText">Eventi in evidenza</div>
            <div className="highlightedEventsDiv">
                <div className="eventElement">
                    <FaChevronLeft className="chevronLeft" />
                    {eventArray[0]}
                    <FavoriteBorder className="favoriteBorder" />
                    <FaChevronRight className="chevronRight" />
                </div>
            </div>
        </div>
    )
}

export default EventSlideShow;