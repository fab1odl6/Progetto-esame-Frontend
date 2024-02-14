import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateArt, setFavorite, setPage } from "../store";
import { useContext, useState, useEffect } from "react";
import NavigationContext from "../context/navigation";
import LoginModals from "../components/modals/loginModals";

function ArtworkDetailsPage({ navigateBack }) {
  const bgcolor = "bg-[#334466]";
  const textcontainerClass = `${bgcolor} bg-opacity-75 p-8 rounded-md backdrop-filter backdrop-blur-md`;
  const titleClass =
    "title-font sm:text-4xl text-3xl mb-4 font-medium text-white";
  const imageContainerClass =
    "lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex justify-center items-center relative image-container";
  const descriptionClass = "mb-8 leading-relaxed text-white";
  const heartClass = "text-red-500 mr-2";
  const favoriteboxClass = "flex justify-center text-white";
  const favoritebuttonClass =
    "inline-flex items-center text-white bg-blue-300 border-0 py-2 px-6 focus:outline-none hover:bg-blue-400 rounded text-lg";
  const imageClass =
    "max-w-xl max-h-xl rounded object-cover object-center rounded max-w-full max-h-full";
  const linkClass = "text-blue-500 hover:underline";
  const backgroundClass =
    "text-gray-600 body-font bg-cover bg-center bg-fixed backdrop-filter backdrop-blur-lg  w-full overflow-hidden";
  const loginmodalClass =
    "container mx-auto flex px-5 py-24 md:flex-row flex-col items-center";
  const navigatebackClass = `absolute top-4 left-4 inline-flex items-center text-white bg-blue-300 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded text-l`;
  const textboxClass =
    "lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center";

  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const { logged, artworks } = useSelector((state) => {
    return state.users;
  });
  const { art, favoriteState } = useSelector((state) => {
    return state.artDetails;
  });
  const [modal, setModal] = useState(false);
  const [buttonText, setButtonText] = useState("");

  const handleNavigateBack = () => {
    navigateBack();
  };

  const handleClickHeart = function () {
    if (logged) {
      dispatch(updateArt(art));
      dispatch(setFavorite(!favoriteState));

      setButtonText((prevText) =>
        prevText === "Add to Favorites"
          ? "Remove from Favorites"
          : "Add to Favorites"
      );
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

  const TextContainer = ({ children }) => (
    <div className={textcontainerClass}>
      <div className="text-left">{children}</div>
    </div>
  );

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === art.id)) {
        dispatch(setFavorite(true));
        setButtonText("Remove from Favorites");
      } else {
        dispatch(setFavorite(false));
        setButtonText("Add to Favorites");
      }
    } else {
      dispatch(setFavorite(false));
    }
  }, [logged, artworks, art.id]);

  useEffect(() => {
    dispatch(setPage("/artworkDetails"));
  }, []);

  return (
    <section
      className={backgroundClass}
      style={{ margin: 0, padding: 0, backgroundImage: `url(${art.image})` }}
    >
      <div className={loginmodalClass}>
        {modal && (
          <LoginModals
            onClickButton={handleClickButton}
            onCloseLog={handleClickCloseLog}
            open={handleClickHeart}
          />
        )}
        <button className={navigatebackClass} onClick={handleNavigateBack}>
          <span className="mr-2">&#8592;</span>
          Back
        </button>
        <div className={imageContainerClass}>
          <img className={imageClass} alt={art.title} src={art.image} />
        </div>
        <div className={textboxClass}>
          <TextContainer>
            <h1 className={titleClass}>
              <b>Title</b>: {art.title}
            </h1>
            <p className={descriptionClass}>
              <b>Author</b>: {art.authorName}
            </p>
            {art.link && (
              <div className={descriptionClass}>
                <b>Source Link</b>:{" "}
                {art.link && (
                  <a
                    className={linkClass}
                    href={art.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {art.title}
                  </a>
                )}
              </div>
            )}
            <p className={descriptionClass}>
              <b>Department</b>: {art.department || "Unknown Department"}
            </p>
            <p className={descriptionClass}>
              <b>Culture</b>: {art.culture || "Unknown Culture"}
            </p>
            <p className={descriptionClass}>
              <b>Date</b>: {art.date}
            </p>
            <p className={descriptionClass}>
              <b>Classification</b>:{" "}
              {art.classification || "Unknown Classification"}
            </p>
            <div className={favoriteboxClass}>
              <button
                className={favoritebuttonClass}
                onClick={handleClickHeart}
              >
                {favoriteState ? (
                  <FaHeart className={heartClass} />
                ) : (
                  <FaRegHeart className={heartClass} />
                )}
                {buttonText}
              </button>
            </div>
          </TextContainer>
        </div>
      </div>
    </section>
  );
}

export default ArtworkDetailsPage;
