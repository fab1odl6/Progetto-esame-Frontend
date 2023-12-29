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

    return (
        <div>
            <div className="highlightedEventsText">Eventi in evidenza</div>
            <div className="highlightedEventsDiv">
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
                </div>
            </div>
        </div>
    )
}

export default EventSlideShow;
