<<<<<<< HEAD
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from "react";

function EventSlideShow() {

    let eventArray = [
        {
            name: "evento 1",
            favorite: false
        },
        {
            name: "evento 2",
            favorite: false
        },
        {
            name: "evento 3",
            favorite: false
        },
        {
            name: "evento 4",
            favorite: false
        },
        {
            name: "evento 5",
            favorite: false
        }
    ]

    const [eventIndex, setEventIndex] = useState(0);
    const [eventArrayState, seteventArrayState] = useState(eventArray);

    const handleClickChevronLeft = function () {
        setEventIndex((prevIndex) => (prevIndex === 0 ? eventArrayState.length - 1 : prevIndex - 1));
    }

    const handleClickChevronRight = function () {
        setEventIndex((prevIndex) => (prevIndex === eventArrayState.length - 1 ? 0 - 1 : prevIndex + 1));
    }

    const handleClickHeart = function () {
        const updated = eventArrayState.map((el, i) => {
            if (i === eventIndex) {
                return {
                    ...el,
                    favorite: !el.favorite
                };
            } else {
                return el;
            }
        })

        seteventArrayState(updated);
    }
=======
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useState } from "react";


function EventSlideShow() {

    var eventArray = ["evento 1", "evento 2", "evento 3", "evento 4", "evento 5"];
>>>>>>> 732f68ff7ef9d4d496bcdff6fb4ab46644985b54

    return (
        <div>
            <div className="highlightedEventsText">Eventi in evidenza</div>
            <div className="highlightedEventsDiv">
<<<<<<< HEAD
                <div className="EventElement">
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft} />
                    {eventArrayState.length > 0 && (
                        <>
                            {eventArrayState[eventIndex].name}
                            {eventArrayState[eventIndex].favorite ? (
                                <FaHeart className="favorite" onClick={handleClickHeart} />
                            ) : (
                                <FaRegHeart className="favorite" onClick={handleClickHeart} />
                            )}
                        </>
                    )}
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight} />
=======
                <div className="eventElement">
                    <FaChevronLeft className="chevronLeft" />
                    {eventArray[0]}
                    <FavoriteBorder className="favoriteBorder" />
                    <FaChevronRight className="chevronRight" />
>>>>>>> 732f68ff7ef9d4d496bcdff6fb4ab46644985b54
                </div>
            </div>
        </div>
    )
}

<<<<<<< HEAD
export default EventSlideShow;
=======
export default EventSlideShow;
>>>>>>> 732f68ff7ef9d4d496bcdff6fb4ab46644985b54
