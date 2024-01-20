import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import FavoriteEventShow from "./FavoriteEventShow";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../store";

/*
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
*/

function EventCard({ event }) {

  /*
  const events  = useSelector((state) => {
    console.log("STATO:",state.users.events)
    return state.users.events;
  })
  console.log("Events:", events)
  */

  const containerClass = "border-2 mb-2 rounded-lg overflow-hidden";
  const favoriteClass = "ml-auto text-2xl";
  const imageClass = "w-full h-40 object-cover cursor-pointer";
  const titleAndHeartClass = "flex p-4";

  const dispatch = useDispatch();
  //const [favorite, setFavorite] = useState(true);
  const [full, setFull] = useState(false);

  const handleClickHeart = function () {
    //setFavorite(!favorite);
    //updateFavorite(event, favorite);
    dispatch(updateEvent(event));
    //setFavorite(!favorite);
  };

  const handleClickShow = function () {
    setFull(!full);
  }

  /*
  {event.favorite ? (
                <FaHeart className={favoriteClass} onClick={(e) => { e.stopPropagation(); handleClickHeart(); }} />
              ) : (
                <FaRegHeart className={favoriteClass} onClick={(e) => { e.stopPropagation(); handleClickHeart(); }} />
              )}
  */

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
