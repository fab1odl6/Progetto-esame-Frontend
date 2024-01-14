import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import className from "classnames";
import FavoriteEventShow from "../components/FavoriteEventShow";
import { switchFullSavedEvent, switchFavoriteSavedEvent } from "../HomePage/store";


function EventCard({ event }) {
  const containerClass = className("border-2 mb-2 rounded-lg overflow-hidden");
  const favoriteClass = className("ml-auto text-2xl");
  const imageClass = className("w-full h-40 object-cover");
  const titleAndHeart = className("flex p-4");


  const { array, index } = useSelector((state) => {
    return state.favoriteEvents;
  })

  const dispatch = useDispatch();

  const handleClickHeart = function (event) {
    dispatch(switchFavoriteSavedEvent(event));
  };

  const handleClickShow = function () {
    dispatch(switchFullSavedEvent());
  }

  return (
    <div>
      {array[index].favorite &&
        (<div className={containerClass}>
          <div>
            <img src={event.image} className={imageClass} alt={event.name} onClick={handleClickShow} />
            <div className={titleAndHeart}>
              <div onClick={handleClickShow}>{event.name}</div>
              {event.favorite ? (
                <FaHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
              ) : (
                <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
              )}
            </div>
          </div>
        </div>)}
      {array[index].full && <FavoriteEventShow key={array[index].name} onClick={(e1) => handleClickHeart(e1)} />}
    </div>
  );
}

export default EventCard;
