import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt } from "../../store";
import styled from "styled-components";
import { Carousel } from "@material-tailwind/react";
import ArtSlideShowCard from "./ArtSlideShowCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconButton } from "@mui/material";

const ArtText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 8xl;
  margin-bottom: 10px;
`;

function ArtSlideShow() {
  const carouselClass = "relative w-md";
  const leftbuttonClass = "!absolute top-2/4 !left-4 -translate-y-2/4";
  const rightbuttonClass = "!absolute top-2/4 !right-4 -translate-y-2/4";
  const artTextClass = "text-center font-bold text-8xl mb-10 cursor-pointer";

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
      <div className={artTextClass}></div>
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
            className={leftbuttonClass}
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
            className={rightbuttonClass}
          >
            <FaChevronRight />
          </IconButton>
        )}
      ></Carousel>
    </div>
  );
}

export default ArtSlideShow;
