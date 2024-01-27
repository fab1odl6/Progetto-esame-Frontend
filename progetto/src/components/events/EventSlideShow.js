import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, updateEvent } from "../../store";
import { useState, useEffect, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";
import { Carousel } from "@material-tailwind/react";
import EventSlideShowCard1 from "./EventSlideShowCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconButton } from "@mui/material";

function EventSlideShow() {
  const containerClass = "overflow:auto z-50";
  const eventTextClass = "text-center font-bold text-4xl my-20";
  const carouselClass = "relative w-md";
  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const { array, index } = useSelector((state) => {
    return state.events;
  });

  const { logged, events } = useSelector((state) => {
    return state.users;
  });
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClickHeart = function (event) {
    if (logged) {
      dispatch(updateEvent(event));
      setFavoriteState(!favoriteState);
    } else {
      setModal(true);
    }
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

  const render = array.map((item) => {
    return <EventSlideShowCard1 event={item} />;
  });

  const handleClickLeft = function () {
    dispatch(swipeLeftEvent());
  };

  const handleClickRight = function () {
    dispatch(swipeRightEvent());
  };

  return (
    <div>
      {array[index] && (
        <div className={containerClass}>
          {modal && (
            <LoginModals
              onClickButton={handleClickButton}
              onCloseLog={handleClickCloseLog}
              open={handleClickHeart}
            />
          )}
          <div className={eventTextClass}>Highlighted Events</div>
          <Carousel
            className={carouselClass}
            children={render}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={() => {
                  handlePrev();
                  handleClickLeft();
                }}
                className="!absolute top-2/4 !left-4 -translate-y-2/4"
              >
                <FaChevronLeft />
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={() => {
                  handleNext();
                  handleClickRight();
                }}
                className="!absolute top-2/4 !right-4 -translate-y-2/4"
              >
                <FaChevronRight />
              </IconButton>
            )}
          ></Carousel>
        </div>
      )}
    </div>
  );
}

export default EventSlideShow;
