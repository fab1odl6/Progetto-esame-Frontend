import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateArt, setFavorite } from "../store";
import { useContext, useState, useEffect } from "react";
import NavigationContext from "../context/navigation";
import LoginModals from "../components/modals/loginModals";

function ArtworkDetailsPage() {
  const containerClass = "items-center bg-white overflow-auto p-4";
  const imageContainerClass = "flex items-center relative"; // Modificato da "items-center" a "items-center"
  const contentContainerClass =
    "flex flex-row justify-start items-center relative z-10 ml-4 space-x-4 flex-1"; // Modifica qui: aggiunta della classe items-center
  const descriptionContainerClass = "flex items-center justify-center ml-8"; // Aggiunta della classe per centrare e spostare a destra
  const titleClass = "text-lg font-semibold text-wood";
  const imageClass = "flex-1 max-w-xl max-h-xl rounded ml-4";
  const firstRowClass = "flex justify-between items-center p-2";
  const favoriteClass = "text-2xl cursor-pointer";
  const linkClass = "font-semibold text-wood hover:underline";
  const overlayClass = "absolute inset-0 bg-black opacity-50";
  const heartContainerClass = "absolute p-4";
  const highlightedInfoContainerClass =
    "bg-white bg-opacity-75 p-4 rounded-md shadow-md ml-4";
  const textContainerClass = "ml-auto p-4";

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
    document.body.style.padding = "0";
    document.body.style.margin = "0";

    if (logged) {
      if (artworks.find((item) => item.id === art.id)) {
        dispatch(setFavorite(true));
      } else {
        dispatch(setFavorite(false));
      }
    }
    return () => {
      document.body.style.padding = "";
      document.body.style.margin = "";
    };
  }, [logged, artworks]);

  return (
    <div
      className={`${containerClass} my-custom-padding`}
      style={{ margin: 0, padding: 0 }}
    >
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <div
        className={imageContainerClass}
        style={{
          position: "relative",
          minHeight: "1000px", // Altezza minima desiderata per lo sfondo
          backgroundImage: art.image ? `url(${art.image})` : "none",
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
        }}
      >
        {art.image && <div className={overlayClass}></div>}
        <div className={contentContainerClass + " flex-1"}>
          {art.image && (
            <img
              className={imageClass}
              key={art.id}
              src={art.image}
              alt={art.title}
            />
          )}
          <div className={textContainerClass}>
            <div className={highlightedInfoContainerClass}>
              <div className={`${titleClass} text-wood`}>
                Titolo: {art.title}
              </div>
              <div className={`text-wood`}>Autore: {art.authorName}</div>
              {art.link && (
                <div>
                  <span className={`text-wood`}>Link di Origine: </span>
                  <a
                    className={`${linkClass} text-wood`}
                    href={art.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {art.title}
                  </a>
                </div>
              )}
              {art.department && (
                <div className={`text-wood`}>Department: {art.department}</div>
              )}
              {art.culture && (
                <div className={`text-wood`}>Culture: {art.culture}</div>
              )}
              {art.date && <div className={`text-wood`}>Date: {art.date}</div>}
              {art.classification && (
                <div className={`text-wood`}>
                  Classification: {art.classification}
                </div>
              )}
            </div>
          </div>
          <div
            className={heartContainerClass}
            style={{
              top: "90%",
              left: "38%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {favoriteState ? (
              <FaHeart
                className={`${favoriteClass} text-red-500`}
                onClick={handleClickHeart}
              />
            ) : (
              <FaRegHeart
                className={`${favoriteClass} text-red-500`}
                onClick={handleClickHeart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetailsPage;
