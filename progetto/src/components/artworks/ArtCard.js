import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import NavigationContext from "../../context/navigation";
import { setArt, addArtworkUser, removeArtworkUser } from "../../store";
import LoginModals from "../modals/loginModals";
import ConfirmModal from "../modals/ConfirmModal";

function ArtCard({ artwork }) {
  const textbgcolor = "bg-[#bbaabb]";
  const textcolor = "#FFFFFF"; 
  const containerClass = `relative flex items-center justify-center h-60 w-79.5 rounded-xl shadow-xl ${textbgcolor} mx-auto my-8 group mb-1 bg-opacity-75 rounded-t-xl`;
  const artContainer ="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700";
  const imageClass ="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110 cursor-pointer rounded-xl";
  const textContainer = `absolute bottom-0 left-0 p-3 w-full text-white z-30 shadow-md bg-black bg-opacity-50 rounded-b-xl`;
  const titleClass = `font-serif text-lg font-bold text-white-700 shadow-md shadow-black-10 ${textcolor} text-xl border-b-2 border-white-700 mb-1 line-clamp-1 cursor-pointer `;
  const subtitleClass = `text-sm font-light text-white-700 shadow-md shadow-black-10 mb-1 line-clamp-1`;
  const heartIconClass = "absolute -top-4 -right-4 m-4 z-20 cursor-pointer";
  const favoriteClass = "favorite text-2xl z-6 text-red-500";
  const textStyle = " relative text-shadow-md ";

  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const { logged, artworks } = useSelector((state) => {
    return state.users;
  });
  const [favoriteState, setFavoriteState] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleClickHeart = function () {
    if (logged) {
      if (favoriteState) {
        setConfirmModal(!confirmModal);
      } else {
        dispatch(addArtworkUser(artwork));
        setFavoriteState(!favoriteState);
      }
    } else {
      setLoginModal(true);
    }
  };

  const deleteFavorite = function () {
    dispatch(removeArtworkUser(artwork));
    setConfirmModal(false);
    setFavoriteState(!favoriteState);
  };

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickClose = function () {
    setLoginModal(false);
  };

  const handleClickDetails = function () {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  const openModal = function () {
    setConfirmModal(true);
  };

  const closeModal = function () {
    setConfirmModal(false);
  };

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === artwork.id)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [logged]);

  return (
    <div>
      {confirmModal && (
        <ConfirmModal
          open={openModal}
          onClose={closeModal}
          onDelete={deleteFavorite}
          onUndo={closeModal}
          message={
            "Are you sure you want to delete '" +
            artwork.title +
            "' from your favorites?"
          }
        />
      )}
      <div className={containerClass}>
        {loginModal && (
          <LoginModals
            onClickButton={handleClickButton}
            onCloseLog={handleClickClose}
            open={handleClickHeart}
          />
        )}
        <div className={artContainer}>
          <img
            src={artwork.image}
            className={imageClass}
            onClick={handleClickDetails}
          />
        </div>
        <div className={textContainer}>
          <h1 className={titleClass + textStyle} onClick={handleClickDetails}>
            {artwork.title}
          </h1>
          <h1 className={subtitleClass + textStyle}>
            {" "}
            {artwork.authorName ? artwork.authorName : "Unknown Author"}
          </h1>
        </div>
        <div className={heartIconClass}>
          {favoriteState ? (
            <FaHeart
              className={favoriteClass}
              onClick={() => handleClickHeart(artwork)}
            />
          ) : (
            <FaRegHeart
              className={favoriteClass}
              onClick={() => handleClickHeart(artwork)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtCard;
