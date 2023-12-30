import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent } from './store';

function EventSlideShow() {

    const { array, index } = useSelector((state) => {
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

    return (
        <div>
            <div className="highlightedEventText">Opere in evidenza</div>
            <div className="highlightedEventDiv">
                <div className="eventElement">
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft} />
                    {array[index].name}
                    {array[index].favorite ? (
                        <FaHeart className="favorite" onClick={handleClickHeart} />
                    ) : (
                        <FaRegHeart className="favorite" onClick={handleClickHeart} />
                    )}
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight} />
                </div>
            </div>
        </div>
    );

}

export default EventSlideShow;
