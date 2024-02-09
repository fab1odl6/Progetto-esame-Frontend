import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setArt, removeArtworkUser, addArtworkUser } from "../../store";
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";

function ArtSlideShowCard({ artwork }) {
  const redcolorClass = "text-red-500";
  const ArtContainer ="max-w-screen-md relative flex items-center w-3/4 h-96 mx-auto border-3 border-blue-800 rounded-lg overflow-hidden mb-16 bg-blue-100 shadow dark:bg-blue-800 dark:border-yellow-700 transition-colors duration-300 ease-in-out hover:bg-blue-200";
  const ArtImage = "w-1/2 h-full object-cover hover:scale-105 cursor-pointer";
  const ArtContent = "flex flex-col justify-between p-12 box-border text-black";
  const TitleContainer = "flex flex-col justify-between";
  const Title = "font-bold text-3xl cursor-pointer";
  const Author = "mt-4 text-2xl";
  const FavoriteIcon = "absolute top-10 right-10 text-4xl cursor-pointer";

  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const { index } = useSelector((state) => state.artworks);
  const { logged, artworks } = useSelector((state) => state.users);
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClickHeart = function () {
    if (logged) {
      if (favoriteState) {
        dispatch(removeArtworkUser(artwork));
      } else {
        dispatch(addArtworkUser(artwork));
      }
      setFavoriteState(!favoriteState);
    } else {
      setModal(true);
    }
  };

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  const handleClickDetails = function () {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === artwork.id)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [index, logged]);

  return (
    <div className={ArtContainer}>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <img
        className={ArtImage}
        src={artwork.image}
        alt={artwork.title}
        onClick={handleClickDetails}
      />
      <div className={ArtContent}>
        <div className={TitleContainer}>
          <div>
            <div className={Title} onClick={handleClickDetails}>
              {artwork.title}
            </div>
            {artwork.authorName ? (
              <div className={Author}>{artwork.authorName}</div>
            ) : (
              <div className={Author}>Unknown Author</div>
            )}
          </div>
          <div className={FavoriteIcon}>
            {favoriteState ? (
              <FaHeart className={redcolorClass} onClick={handleClickHeart} />
            ) : (
              <FaRegHeart
                className={redcolorClass}
                onClick={handleClickHeart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtSlideShowCard;
