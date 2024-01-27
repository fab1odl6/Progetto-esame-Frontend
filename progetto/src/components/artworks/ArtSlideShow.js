/* import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, updateArt, setArt } from "../../store";
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";

function ArtSlideShow() {
  const artTextClass = "text-center font-bold text-4xl my-20";
  const artDivClass = "";
  const artContainerClass =
    "card lg:card-side bg-base-100 shadow-xl mx-auto max-w-sm h-96 p-6 bg-yellow-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
  const artElementClass = "flex flex-col items-center justify-center mx-auto";
  const imageClass = "max-h-72 cursor-pointer place-self-center";
  const chevronClass = "place-self-center text-2xl";
  const titleAndHeartClass = "flex mt-2";
  const favoriteClass = "ml-auto text-2xl";
  const titleContainerClass = "card-body";
  const titleClass = "card-title font-bold cursor-pointer";
  const paragraphClass = "text-base";

  const { navigate } = useContext(NavigationContext);

  const { array, index } = useSelector((state) => {
    return state.artworks;
  });
  console.log("art array: " + array);

  const dispatch = useDispatch();

  const { logged, artworks } = useSelector((state) => {
    return state.users;
  });
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClickChevronLeft = function () {
    dispatch(swipeLeftArt());
  };

  const handleClickChevronRight = function () {
    dispatch(swipeRightArt());
  };

  const handleClickHeart = function (art) {
    if (logged) {
      dispatch(updateArt(art));
      setFavoriteState(!favoriteState);
      setModal(false);
    } else {
      setModal(true);
    }
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

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  const handleClickDetails = function (artwork) {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  const altText = "Image of " + array[index].title;
  return (
    <div>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <div className={artTextClass}>Highlighted Artworks</div>
      <div className={artDivClass}>
        <div className={artContainerClass}>
          <FaChevronLeft
            className={chevronClass + " mr-2 cursor-pointer"}
            onClick={handleClickChevronLeft}
          />
          <div className={artElementClass}>
            <img
              className={imageClass}
              src={array[index].image}
              alt={altText}
              onClick={() => handleClickDetails(array[index])}
            />
            <div className={titleAndHeartClass}>
              <div className={titleContainerClass}>
                <div
                  className={titleClass}
                  onClick={() => handleClickDetails(array[index])}
                >
                  {array[index].title}{" "}
                </div>
                {array[index].authorName ? (
                  <div> {array[index].authorName}</div>
                ) : (
                  <div>Unknown Author</div>
                )}
              </div>
              {favoriteState ? (
                <FaHeart
                  className={`${favoriteClass} text-red-500`}
                  onClick={() => handleClickHeart(array[index])}
                />
              ) : (
                <FaRegHeart
                  className={`${favoriteClass} text-red-500`}
                  onClick={() => handleClickHeart(array[index])}
                />
              )}
            </div>
          </div>
          <FaChevronRight
            className={chevronClass + " ml-2 cursor-pointer"}
            onClick={handleClickChevronRight}
          />
        </div>
      </div>
    </div>
  );
}

export default ArtSlideShow;

*/

import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, updateArt, setArt } from "../../store";
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";
import styled from "styled-components";

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
  const { navigate } = useContext(NavigationContext);

  const { array, index } = useSelector((state) => state.artworks);

  const dispatch = useDispatch();

  const { logged, artworks } = useSelector((state) => state.users);
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClickChevronLeft = function () {
    dispatch(swipeLeftArt());
  };

  const handleClickChevronRight = function () {
    dispatch(swipeRightArt());
  };

  const handleClickHeart = function (art) {
    if (logged) {
      dispatch(updateArt(art));
      setFavoriteState(!favoriteState);
      setModal(false);
    } else {
      setModal(true);
    }
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

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  const handleClickDetails = function (artwork) {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  const altText = array[index].title;

  return (
    <div>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <ArtText>Highlighted Artworks</ArtText>
      <ArtContainer>
        <ChevronIcon
          as={FaChevronLeft}
          className="text-2xl mr-2 cursor-pointer"
          onClick={handleClickChevronLeft}
        />
        <ArtImage
          src={array[index].image}
          alt={altText}
          onClick={() => handleClickDetails(array[index])}
        />
        <ArtContent>
          <TitleContainer>
            <div>
              <Title onClick={() => handleClickDetails(array[index])}>
                {array[index].title}
              </Title>
              {array[index].authorName ? (
                <Author>{array[index].authorName}</Author>
              ) : (
                <Author>Unknown Author</Author>
              )}
            </div>
            <FavoriteIcon>
              {favoriteState ? (
                <FaHeart
                  className="text-red-500"
                  onClick={() => handleClickHeart(array[index])}
                />
              ) : (
                <FaRegHeart
                  className="text-red-500"
                  onClick={() => handleClickHeart(array[index])}
                />
              )}
            </FavoriteIcon>
          </TitleContainer>
        </ArtContent>
        <ChevronIcon
          as={FaChevronRight}
          className="text-2xl ml-2 cursor-pointer"
          onClick={handleClickChevronRight}
        />
      </ArtContainer>
    </div>
  );
}

export default ArtSlideShow;





/* import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, updateArt, setArt } from "../../store";
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";

function ArtSlideShow() {
  const artTextClass = "text-center font-bold text-4xl my-20";
  const artContainerClass =
  "mx-auto flex flex-row place-content-center max-w-md h-96 p-6 bg-yellow-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
const artCardContentClass = "flex flex-row items-center w-full";
  const artElementClass = "mx-4";
  const imageClass = "max-h-72 cursor-pointer";
  const imageContainerClass = "flex-shrink-0 w-1/3"; // Ora occupa un terzo dello spazio in larghezza
const textContainerClass = "flex-grow w-2/3"; // Ora occupa due terzi dello spazio in larghezza

  const chevronClass = "place-self-center text-2xl";
  const titleAndHeartClass = "flex mt-2";
  const favoriteClass = "ml-auto text-2xl";
  const titleContainerClass = "text-lg";
  const titleClass = "font-bold cursor-pointer";

  const { navigate } = useContext(NavigationContext);

  const { array, index } = useSelector((state) => {
    return state.artworks;
  });

  const dispatch = useDispatch();

  const { logged, artworks } = useSelector((state) => {
    return state.users;
  });
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClickChevronLeft = function () {
    dispatch(swipeLeftArt());
  };

  const handleClickChevronRight = function () {
    dispatch(swipeRightArt());
  };

  const handleClickHeart = function (art) {
    if (logged) {
      dispatch(updateArt(art));
      setFavoriteState(!favoriteState);
      setModal(false);
    } else {
      setModal(true);
    }
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

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  const handleClickDetails = function (artwork) {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  const altText = "Image of " + array[index].title;
  return (
    <div>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <div className={artTextClass}>Highlighted Artworks</div>
      <div className={artContainerClass}>
        <FaChevronLeft
          className={chevronClass + " mr-2 cursor-pointer"}
          onClick={handleClickChevronLeft}
        />
        <div className={artCardContentClass}>
          <div className={imageContainerClass}>
            <img
              className={imageClass}
              src={array[index].image}
              alt={altText}
              onClick={() => handleClickDetails(array[index])}
            />
          </div>
          <div className={textContainerClass}>
            <div className={artElementClass}>
              <div className={titleAndHeartClass}>
                <div className={titleContainerClass}>
                  <div
                    className={titleClass}
                    onClick={() => handleClickDetails(array[index])}
                  >
                    {array[index].title}{" "}
                  </div>
                  {array[index].authorName ? (
                    <div> {array[index].authorName}</div>
                  ) : (
                    <div>Unknown Author</div>
                  )}
                </div>
                {favoriteState ? (
                  <FaHeart
                    className={`${favoriteClass} text-red-500`}
                    onClick={() => handleClickHeart(array[index])}
                  />
                ) : (
                  <FaRegHeart
                    className={`${favoriteClass} text-red-500`}
                    onClick={() => handleClickHeart(array[index])}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <FaChevronRight
          className={chevronClass + " ml-2 cursor-pointer"}
          onClick={handleClickChevronRight}
        />
      </div>
    </div>
  );
}

export default ArtSlideShow;

*/