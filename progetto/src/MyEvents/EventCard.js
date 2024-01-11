import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { switchFavoriteEvent } from "../HomePage/store";
import className from "classnames";


function EventCard({ event }) {

    const favoriteClass = className("ml-auto text-2xl");
    const imageClass = className("w-full h-auto max-h-96");

    const [favorite, setFavorite] = useState(true);

    const dispatch = useDispatch();

    const handleClickHeart = function (event) {
        dispatch(switchFavoriteEvent(event));
        setFavorite(false);
    }

    return (
        <div>
            {favorite && (<div>
                <img src={event.image} className={imageClass} />
                <div>{event.name}</div>
                {event.favorite ? (
                    <FaHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
                ) : (
                    <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
                )}
            </div>)}
        </div>
    )
}

export default EventCard;