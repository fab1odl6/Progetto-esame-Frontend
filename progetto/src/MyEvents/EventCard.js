import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoriteEventShow from "./FavoriteEventShow";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/FirebaseConfig";
import { getDatabase, ref, set, remove } from "firebase/database";


function updateFavorite(event, favorite) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

  if (!favorite) {
    set(ref(db, 'users/Fabio/events/' + event.name), {
      id: event.id,
      name: event.name,
      image: event.image,
      date: event.date,
      department: event.department,
      guests: event.guests,
      favorite: true,
      full: false
    })
  } else {
    remove(ref(db, "users/Fabio/events/" + event.name));
  }
}


function EventCard({ event }) {

  const containerClass = "border-2 mb-2 rounded-lg overflow-hidden";
  const favoriteClass = "ml-auto text-2xl";
  const imageClass = "w-full h-40 object-cover";
  const titleAndHeartClass = "flex p-4";


  const [favorite, setFavorite] = useState(true);
  const [full, setFull] = useState(false);

  const handleClickHeart = function () {
    setFavorite(!favorite);
    updateFavorite(event, favorite);
  };

  const handleClickShow = function () {
    setFull(!full);
  }

  return (
    <div>
      {favorite &&
        (<div className={containerClass}>
          <div onClick={handleClickShow}>
            <img src={event.image} className={imageClass} alt={event.name} onClick={handleClickShow} />
            <div className={titleAndHeartClass}>
              <div>{event.name}</div>
              {event.favorite ? (
                <FaHeart className={favoriteClass} onClick={(e) => { e.stopPropagation(); handleClickHeart(); }} />
              ) : (
                <FaRegHeart className={favoriteClass} onClick={(e) => { e.stopPropagation(); handleClickHeart(); }} />
              )}
            </div>
          </div>
        </div>)}
      {full && <FavoriteEventShow event={event} key={event.name} onClickClose={handleClickShow} onClickHeart={handleClickHeart} />}
    </div>
  );
}

export default EventCard;
