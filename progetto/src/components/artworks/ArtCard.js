import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import NavigationContext from "../../context/navigation";
import { setArt, addArtworkUser, removeArtworkUser } from "../../store";
import LoginModals from "../modals/loginModals";
import ConfirmModal from "../modals/ConfirmModal";

function ArtCard({ artwork }) {
  const containerClass =
    "relative flex items-center justify-center h-60 w-79.5 rounded-xl shadow-xl ring-gray-900/5 mx-auto my-8 group mb-1";
  const artContainer =
    "z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700";
  const imageClass =
    "animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110";
  const textContainer =
    "absolute bottomabsolute bottom-0 left-0 p-3 w-full text-white z-30 ";
  const titleClass =
    "font-serif text-lg font-bold text-white-700 shadow-md shadow-black-10";
  const subtitleClass =
    "text-sm font-light text-white-700 shadow-md shadow-black-10";
  const heartIconClass = "absolute -top-4 -right-4 m-4 z-20 cursor-pointer";
  const favoriteClass = "favorite text-2xl z-6 text-red-500";
  const textStyle = " relative text-shadow-md";

  const { logged, artworks } = useSelector((state) => {
    return state.users;
  });

  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const { navigate } = useContext(NavigationContext);

  const dispatch = useDispatch();

  const handleClickHeart = function () {
    if (logged) {
      if (favoriteState) {
        setConfirmModal(!confirmModal);
      } else {
        dispatch(addArtworkUser(artwork));
        setFavoriteState(!favoriteState);
      }
    } else {
      setModal(true);
    }
  };

  const deleteFavorite = function () {
    if (confirmModal) {
      dispatch(removeArtworkUser(artwork));
      setConfirmModal(false);
      setFavoriteState(!favoriteState);
    }
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

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickClose = function () {
    setModal(false);
  };

  const handleClickDetails = function () {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  const closeModal = function () {
    setConfirmModal(false);
  };

  const openModal = function () {
    setConfirmModal(true);
  };

  return (
    <div>
      {confirmModal && (
        <ConfirmModal
          open={openModal}
          onClose={closeModal}
          onDelete={closeModal}
          onUndo={deleteFavorite}
          message={
            "Are you sure you want to delete '" +
            artwork.title +
            "' from your favorites?"
          }
        />
      )}
      <div className={containerClass}>
        {modal && (
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
