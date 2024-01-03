import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } from '../store';
import EventShow from "./EventShow";

function EventSlideShow() {

    const { array, index, full } = useSelector((state) => {
        return state.events;
    });

    const dispatch = useDispatch();

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftEvent());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightEvent());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteEvent());
    }

    const handleClickEvent = function () {
        dispatch(switchFullEvent())
    }

    return (
        <div>
            <div className="highlightedEventText">Opere in evidenza</div>
            <div className="highlightedEventDiv">
                <div className="eventElement">
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft} />
                    <div onClick={handleClickEvent}>
                        {array[index].name}
                    </div>
                    {array[index].favorite ? (
                        <FaHeart className="favorite" onClick={handleClickHeart} />
                    ) : (
                        <FaRegHeart className="favorite" onClick={handleClickHeart} />
                    )}
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight} />
                    {full && <EventShow />}
                </div>
            </div>
        </div>
    );

}

export default EventSlideShow;
