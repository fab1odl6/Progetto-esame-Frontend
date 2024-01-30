import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateArt, setFavorite } from "../store";
import { useContext, useState, useEffect } from "react";
import NavigationContext from "../context/navigation";
import LoginModals from "../components/modals/loginModals";

function ArtworkDetailsPage({ navigateBack }) {
  const containerClass = "items-center bg-white overflow-auto p-4";
  const imageContainerClass =
    "flex justify-center items-center relative image-container";
  const titleClass = "text-lg font-semibold";
  const imageClass = "max-w-xl max-h-xl rounded";
  const firstRowClass = "flex justify-between items-center p-2";
  const favoriteClass = "text-2xl cursor-pointer";
  const linkClass = "text-blue-500 hover:underline";
  const backgroundClass =
    "bg-cover bg-center bg-fixed backdrop-filter backdrop-blur-lg";

  const { navigate } = useContext(NavigationContext);

  const { art, favoriteState } = useSelector((state) => {
    return state.artDetails;
  });

  const handleNavigateBack = () => {
    navigateBack();
  };

  const [buttonText, setButtonText] = useState("");

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

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === art.id)) {
        dispatch(setFavorite(true));
        setButtonText("Remove from Favorites");
      } else {
        dispatch(setFavorite(false));
        setButtonText("Add to Favorites");
      }
    }
  }, [logged, artworks, art.id]);

  const TextContainer = ({ children }) => (
    <div className="bg-gray-800 bg-opacity-75 p-8 rounded-md backdrop-filter backdrop-blur-md">
      <div className="text-left">{children}</div>
    </div>
  );

  return (
    <section
      className={`text-gray-600 body-font ${backgroundClass} w-full overflow-hidden`}
      style={{ margin: 0, padding: 0, backgroundImage: `url(${art.image})` }}
    >
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        {modal && (
          <LoginModals
            onClickButton={handleClickButton}
            onCloseLog={handleClickCloseLog}
            open={handleClickHeart}
          />
        )}
        <button
          className="absolute top-4 left-4 inline-flex items-center text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
          onClick={handleNavigateBack}
        >
          <span className="mr-2">&#8592;</span>
          Back
        </button>
        <div
          className={`lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 ${imageContainerClass}`}
        >
          <img
            className={`${imageClass} object-cover object-center rounded max-w-full max-h-full`}
            alt={art.title}
            src={art.image}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <TextContainer>
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              <b>Title</b>: {art.title}
            </h1>
            <p className="mb-8 leading-relaxed text-white">
              <b>Author</b>: {art.authorName}
            </p>
            {art.link && (
              <div className="mb-8 leading-relaxed text-white">
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
            <p className="mb-8 leading-relaxed text-white">
              <b>Department</b>: {art.department || "Unknown Department"}
            </p>
            <p className="mb-8 leading-relaxed text-white">
              <b>Culture</b>: {art.culture || "Unknown Culture"}
            </p>
            <p className="mb-8 leading-relaxed text-white">
              <b>Date</b>: {art.date}
            </p>
            <p className="mb-8 leading-relaxed text-white">
              <b>Classification</b>:{" "}
              {art.classification || "Unknown Classification"}
            </p>
            <div className="flex justify-center text-white">
              <button
                className="inline-flex items-center text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
                onClick={handleClickHeart}
              >
                {favoriteState ? (
                  <FaHeart className="text-red-500 mr-2" />
                ) : (
                  <FaRegHeart className="text-red-500 mr-2" />
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
