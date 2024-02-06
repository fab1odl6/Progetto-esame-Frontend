import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent } from "../../store";
import { Carousel } from "@material-tailwind/react";
import EventSlideShowCard from "./EventSlideShowCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconButton } from "@mui/material";

function EventSlideShow() {
  const containerClass = "overflow:auto z-50";
  const eventTextClass = "text-center font-bold text-4xl my-10";
  const carouselClass = "relative w-md m-0";
  const dispatch = useDispatch();

  const { array, index } = useSelector((state) => {
    return state.events;
  });

  const handleClickLeft = function () {
    dispatch(swipeLeftEvent());
  };

  const handleClickRight = function () {
    dispatch(swipeRightEvent());
  };

  const render = array
    .filter((item) => {
      return new Date(item.date) >= new Date();
    })
    .map((item) => {
      return <EventSlideShowCard event={item} key={item.name} />;
    });

  return (
    <div>
      {array[index] && (
        <div className={containerClass}>
          <div className={eventTextClass}></div>
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
