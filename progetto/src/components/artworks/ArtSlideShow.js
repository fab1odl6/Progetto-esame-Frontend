import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt } from "../../store";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Carousel } from "@material-tailwind/react";
import ArtSlideShowCard from "./ArtSlideShowCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconButton } from "@mui/material";

const ArtContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  margin-bottom: 20px;
  height: 500px;
`;

const ArtImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

const ArtContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50px;
  box-sizing: border-box;
  color: black;
`;

const ArtText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 8xl;
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3em;
  cursor: pointer;
`;

const Author = styled.div`
  margin-top: 10px;
  font-size: 2em;
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 4em;
  cursor: pointer;
`;

const ChevronIcon = styled.div`
  font-size: 3em;
  cursor: pointer;
`;

function ArtSlideShow() {
  const carouselClass = "relative w-md";
  const artContainerClass =
    "relative flex items-center max-w-1000 mx-auto border-1 border-solid border-gray-300 rounded-lg overflow-hidden bg-white mb-20 h-500";
  const artImageClass = "w-1/2 h-full object-cover";
  const artContentClass = "flex-1 flex flex-col p-10 box-border text-black";
  const artTextClass = "text-center font-bold text-8xl mb-10";
  const titleContainerClass = "flex-1 flex flex-col justify-between";
  const titleClass = "font-bold text-4xl cursor-pointer";
  const authorClass = "mt-10 text-2xl";
  const favoriteIconClass =
    "absolute top-10 right-10 text-4xl cursor-pointer text-red-500";
  const chevronIconClass = "text-3xl cursor-pointer";

  const { array, index } = useSelector((state) => state.artworks);

  const dispatch = useDispatch();

  const { logged, artworks } = useSelector((state) => state.users);
  const [favoriteState, setFavoriteState] = useState(false);

  const handleClickLeft = function () {
    dispatch(swipeLeftArt());
  };

  const handleClickRight = function () {
    dispatch(swipeRightArt());
  };

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === array[index].id)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [index, logged]);

  const render = array.slice(0, 5).map((item) => {
    return <ArtSlideShowCard artwork={item} key={item.id} />;
  });

  return (
    <div>
      <ArtText className={titleClass}>Highlighted Artworks</ArtText>
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
  );
}

export default ArtSlideShow;
