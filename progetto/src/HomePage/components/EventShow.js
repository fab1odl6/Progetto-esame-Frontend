import { useDispatch, useSelector } from "react-redux";
import { switchFullEvent, switchFavoriteEvent } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function EventShow() {

    const { array, index } = useSelector((state) => {
        return state.events;
    })

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullEvent());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteEvent());
    }

    return (
        <div className="openedModal">
            <div className="firstRow">
                <div>{array[index].name}</div>
                {array[index].favorite ? (
                    <FaHeart className="favoriteShow" onClick={handleClickHeart} />
                ) : (
                    <FaRegHeart className="favoriteShow" onClick={handleClickHeart} />
                )}
                <IoIosClose className="closeButton" onClick={handleClickClose} />
            </div>
            <div>bbb</div>
        </div>
    )

}

export default EventShow;