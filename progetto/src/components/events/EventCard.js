import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import FavoriteEventShow from "./FavoriteEventShow";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../store";


function EventCard({ event }) {

  const containerClass = "border-2 mb-2 rounded-lg overflow-hidden z-50";
  const favoriteClass = "ml-auto text-2xl";
  const imageClass = "w-full h-96 object-cover cursor-pointer";
  const titleAndHeartClass = "flex p-4";

  const dispatch = useDispatch();
  const [full, setFull] = useState(false);

  const handleClickHeart = function () {
    dispatch(updateEvent(event));
  };

  const handleClickShow = function () {
    setFull(!full);
  }


  return (
    <div>
      <div className={containerClass}>
        <img src={event.image} className={imageClass} alt={event.name} onClick={handleClickShow} />
        <div className={titleAndHeartClass}>
          <div className="cursor-pointer" onClick={handleClickShow}>{event.name}</div>
          <FaHeart className={favoriteClass} onClick={handleClickHeart} />
        </div>
      </div>
      {full && <FavoriteEventShow event={event} key={event.name} onClickClose={handleClickShow} onClickHeart={handleClickHeart} />}
    </div>
  );
}

export default EventCard;
