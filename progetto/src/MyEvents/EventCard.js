import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { switchFavoriteEvent } from "../HomePage/store";
import className from "classnames";

function EventCard({ event }) {
  const containerClass = className("border-2 mb-2 rounded-lg overflow-hidden");
  const favoriteClass = className("ml-auto text-2xl");
  const imageClass = className("w-full h-40 object-cover"); // Modificato stile per immagine
  const titleAndHeart = className("flex p-4"); // Aggiunto padding

  const [favorite, setFavorite] = useState(true);

  const dispatch = useDispatch();

  const handleClickHeart = function (event) {
    dispatch(switchFavoriteEvent(event));
    setFavorite(false);
  };

  return (
    <div className={containerClass}>
      {favorite && (
        <div>
          <img src={event.image} className={imageClass} alt={event.name} />
          <div className={titleAndHeart}>
            <div>{event.name}</div>
            {event.favorite ? (
              <FaHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
            ) : (
              <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCard;
