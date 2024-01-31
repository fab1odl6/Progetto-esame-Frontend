import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../store";
import EventShow from "./EventShow";
import { useState, useEffect, useContext } from "react";
import LoginModals from "../modals/loginModals";
import NavigationContext from "../../context/navigation";

function EventSlideShowCard1({ event }) {
  const eventContainerClass =
    "w-sm h-full flex justify-center mx-auto flex-row place-content-center border-2 mb-2 rounded-lg overflow-hidden z-50 max-w-sm p-6 bg-yellow-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
  const eventElementClass = "";
  const imageClass = "w-48 h-72 cursor-pointer object-cover mx-auto";
  const titleAndHeartClass = "flex mt-2";
  const favoriteClass = "ml-auto text-2xl cursor-pointer text-red-500";
  const titleClass = "font-bold text-lg place-content-center cursor-pointer";

  const dispatch = useDispatch();
  const { navigate } = useContext(NavigationContext);

  const { logged, events } = useSelector((state) => {
    return state.users;
  });
  const { index } = useSelector((state) => {
    return state.events;
  });
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);
  const [fullState, setFullState] = useState(false);

  const handleClickHeart = function (event) {
    if (logged) {
      dispatch(updateEvent(event));
      setFavoriteState(!favoriteState);
    } else {
      setModal(true);
    }
  };

  const handleClickEvent = function () {
    setFullState(!fullState);
  };
  useEffect(() => {
    if (logged) {
      if (events.find((item) => item.name === event.name)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [logged, index, events]);

  const openModal = function () {
    setFullState(true);
  };

  const closeModal = function () {
    setFullState(false);
  };

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickClose = function () {
    setModal(false);
  };

  const altText = "Image of " + event.name;
  return (
    <div>
      <div className={eventContainerClass}>
        <div>
          {modal && (
            <LoginModals
              onClickButton={handleClickButton}
              onCloseLog={handleClickClose}
              open={handleClickHeart}
            />
          )}
        </div>
        <div className={eventElementClass}>
          <div onClick={handleClickEvent}>
            <img className={imageClass} src={event.image} alt={altText} />
          </div>
          <div className={titleAndHeartClass}>
            <div className={titleClass} onClick={handleClickEvent}>
              {event.name}
            </div>
            {favoriteState ? (
              <FaHeart
                className={favoriteClass}
                onClick={() => handleClickHeart(event)}
              />
            ) : (
              <FaRegHeart
                className={favoriteClass}
                onClick={() => handleClickHeart(event)}
              />
            )}
          </div>
          <div className="text-center">
            Generated by: <br />
            <b>{event.generator}</b>
          </div>
        </div>

        {fullState && (
          <EventShow
            favoriteState={favoriteState}
            onClickHeart={handleClickHeart}
            setFavoriteState={setFavoriteState}
            open={openModal}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default EventSlideShowCard1;
