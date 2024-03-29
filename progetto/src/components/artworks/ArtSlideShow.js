import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt } from "../../store";
import { Carousel } from "@material-tailwind/react";
import ArtSlideShowCard from "./ArtSlideShowCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconButton } from "@mui/material";

function ArtSlideShow() {
  const containerClass = "overflow:auto z-50";
  const artTextClass = "text-center font-bold text-4xl my-10";
  const carouselClass = "relative w-md";
  const prevArrowClass = "!absolute top-2/4 !left-4 -translate-y-2/4";
  const nextArrowClass = "!absolute top-2/4 !right-4 -translate-y-2/4";
  const chevronClass = "text-white"

  const dispatch = useDispatch();

  const { array } = useSelector((state) => state.artworks);

  const handleClickLeft = function () {
    dispatch(swipeLeftArt());
  };

  const handleClickRight = function () {
    dispatch(swipeRightArt());
  };

  const render = array.slice(0, 5).map((item) => {
    return <ArtSlideShowCard artwork={item} key={item.id} />;
  });

  return (
    <div>
      <div className={containerClass}>
        <div className={artTextClass}></div>
        <Carousel
          className={carouselClass}
          children={render}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              style={{
                backgroundColor: '#77aaff',
              }}
              size="lg"
              onClick={() => {
                handlePrev();
                handleClickLeft();
              }}
              className={prevArrowClass}
            >
              <FaChevronLeft className={chevronClass}/>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              style={{
                backgroundColor: '#77aaff',
              }}
              size="lg"
              onClick={() => {
                handleNext();
                handleClickRight();
              }}
              className={nextArrowClass}
            >
              <FaChevronRight className={chevronClass}/>
            </IconButton>
          )}
        />
      </div>
    </div>
  );
}

export default ArtSlideShow;
