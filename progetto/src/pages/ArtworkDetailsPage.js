import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateArt, setFavorite } from "../store";
import { useContext, useState, useEffect } from "react";
import NavigationContext from "../context/navigation";
import LoginModals from "../components/modals/loginModals";

function ArtworkDetailsPage() {
  const containerClass = "items-center bg-white overflow-auto p-4";
  const imageContainerClass = "flex justify-center items-center relative";
  const titleClass = "text-lg font-semibold";
  const imageClass = "max-w-xl max-h-xl rounded";
  const firstRowClass = "flex justify-between items-center p-2";
  const favoriteClass = "text-2xl cursor-pointer";
  const linkClass = "text-blue-500 hover:underline";

  const { navigate } = useContext(NavigationContext);

  const { art, favoriteState } = useSelector((state) => {
    return state.artDetails;
  });

  const { logged, artworks } = useSelector((state) => {
    return state.users;
  });
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const handleClickHeart = function () {
    console.log("Logged: " + logged);
    if (logged) {
      dispatch(updateArt(art));
      setModal(false);
      dispatch(setFavorite(!favoriteState));
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

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === art.id)) {
        dispatch(setFavorite(true));
      } else {
        dispatch(setFavorite(false));
      }
    }
  }, [logged, artworks]);

  return (
    <div className={containerClass}>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <div className={imageContainerClass}>
        <img
          className={imageClass}
          key={art.id}
          src={art.image}
          alt={art.title}
        />
      </div>
      <div className={firstRowClass}>
        {art.title && <div className={titleClass}>Title: {art.title}</div>}
        {favoriteState ? (
          <FaHeart className={favoriteClass} onClick={handleClickHeart} />
        ) : (
          <FaRegHeart className={favoriteClass} onClick={handleClickHeart} />
        )}
      </div>
      {art.authorName && <div>Author: {art.authorName}</div>}
      {art.link && (
        <div>
          Source Link:{" "}
          <a className={linkClass} href={art.link}>
            {art.title}
          </a>
        </div>
      )}
      {art.department && <div>Department: {art.department}</div>}
      {art.culture && <div>Culture: {art.culture}</div>}
      {art.date && <div>Date: {art.date}</div>}
      {art.classification && <div>Classification: {art.classification}</div>}
    </div>
  );
}

export default ArtworkDetailsPage;
