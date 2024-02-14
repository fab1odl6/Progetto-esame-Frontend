import React from "react";
import EventSlideShow from "../components/events/EventSlideShow";
import ArtSlideShow from "../components/artworks/ArtSlideShow";
import SearchBar from "../components/header & footer/SearchBar";
import { useDispatch } from "react-redux";
import { clearText, setPage } from "../store";
import { useEffect } from "react";

function HomePage() {
  const zIndexEvent = "z-40 mb-3 mt-3";
  const zIndexArt = "z-40 mt-3";
  const textClass = "text-gray-500 dark:text-gray-400";
  const positionitemClass = "inline-flex items-center justify-center w-full";
  const containterstyleClass =
    "h-2 my-8 bg-gray-500 border-0 rounded dark:bg-gray-700";
  const boxstyleClass =
    "absolute px-4 -translate-x-1/2 left-1/2 dark:bg-gray-900";
  const textboxClass = "w-8 h-8 text-gray-700 dark:text-gray-300";
  const paragraphtextClass = "text-gray-500 dark:text-gray-400";
  const welcometextClass =
    "absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold shadow-lg";
  const bgcolor = "bg-white";
  const highlitghtedboxClass =
    "rounded-lg text-blue-800 text-center text-4xl font-bold max-w-screen-md mx-auto mt-20 mb-4 ";
  const lineClass = "w-3/4 mx-auto border-b-4 border-blue-800 mb-4";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
    dispatch(setPage("/"));
  }, []);

  return (
    <div className={bgcolor}>
      <div className="custom-image-container" style={{ position: "relative" }}>
        <img
          src="https://www.perugino2023.org/wp-content/uploads/2022/08/Metropolitan-Museum.jpg"
          alt="Custom Image"
          style={{ width: "100%", height: "550px", objectFit: "cover" }}
        />
        <SearchBar />

        <div className={highlitghtedboxClass}>Highlighted Events</div>
        <div className={lineClass}></div>

        <div
          className={welcometextClass}
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {" "}
          WELCOME TO ART TREASURES{" "}
        </div>
      </div>

      <div className={zIndexEvent}>
        <EventSlideShow />
      </div>

      <p className={textClass}></p>
      <div className={positionitemClass}>
        <hr className={containterstyleClass} />
        <div className={boxstyleClass}>
          <svg
            className={textboxClass}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
        </div>
      </div>
      <p className={paragraphtextClass}></p>

      <div className={highlitghtedboxClass}>
        <p>Highlighted Artworks</p>
      </div>
      <div className={lineClass}></div>
      <div className={zIndexArt}>
        <ArtSlideShow />
      </div>
    </div>
  );
}

export default HomePage;
