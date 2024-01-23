import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, updateEvent } from "../../store";
import EventShow from "./EventShow";
import { useState, useEffect, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";

function EventSlideShow() {
  const containerClass = "overflow: auto z-50";
  const eventTextClass = "";
  const eventDivClass = "relative w-md";
  const eventContainerClass =
    "w-sm h-96 flex justify-center mx-auto flex-row place-content-center border-2 mb-2 rounded-lg overflow-hidden z-50 max-w-sm p-6 bg-yellow-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
  const chevronContainerClass = "flex items-center justify-center";
  const eventElementClass = "";
  const imageClass = "w-48 h-72 cursor-pointer object-cover";
  const chevronClass = "place-self-center text-2xl";
  const titleAndHeartClass = "flex mt-2";
  const favoriteClass = "ml-auto text-2xl";
  const titleClass = "font-bold text-lg place-content-center cursor-pointer";

  const { navigate } = useContext(NavigationContext);

  const { array, index } = useSelector((state) => {
    return state.events;
  });

  const { logged, events } = useSelector((state) => {
    return state.users;
  });
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);
  const [full, setFull] = useState(false);
  console.log(array);
  const dispatch = useDispatch();

  const handleClickChevronLeft = function () {
    dispatch(swipeLeftEvent());
  };

  const handleClickChevronRight = function () {
    dispatch(swipeRightEvent());
  };

  const handleClickHeart = function (event) {
    console.log("Logged: " + logged);
    if (logged) {
      dispatch(updateEvent(event));
      setFavoriteState(!favoriteState);
    } else {
      setModal(true);
    }
  };

  const handleClickEvent = function () {
    setFull(!full);
  };

  useEffect(() => {
    if (logged) {
      if (events.find((item) => item.name === array[index].name)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [index, logged]);

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  const openModal = function () {
    setFull(true);
  };

  const closeModal = function () {
    setFull(false);
  };

  //console.log(array)
  //console.log(index)
  //console.log(array[index])

  const altText = "Image of " + array[index].name;

  return (
    <div className={containerClass}>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <div className={eventTextClass}>Highlighted Events</div>
      <div className={eventDivClass}>
        <div className={eventContainerClass}>
          <div className={chevronContainerClass}>
            <FaChevronLeft
              className={chevronClass + " mr-2 cursor-pointer"}
              onClick={handleClickChevronLeft}
            />
          </div>
          <div className={eventElementClass}>
            <div onClick={handleClickEvent}>
              <img
                className={imageClass}
                src={array[index].image}
                alt={altText}
              />
            </div>
            <div className={titleAndHeartClass}>
              <div className={titleClass} onClick={handleClickEvent}>
                {array[index].name}
              </div>
              {favoriteState ? (
                <FaHeart
                  className={favoriteClass}
                  onClick={() => handleClickHeart(array[index])}
                />
              ) : (
                <FaRegHeart
                  className={favoriteClass}
                  onClick={() => handleClickHeart(array[index])}
                />
              )}
            </div>
          </div>
          <div className={chevronContainerClass}>
            <FaChevronRight
              className={chevronClass + " ml-2 cursor-pointer"}
              onClick={handleClickChevronRight}
            />
          </div>
        </div>
        {full && (
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

export default EventSlideShow;
