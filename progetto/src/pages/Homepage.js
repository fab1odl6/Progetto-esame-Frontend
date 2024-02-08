/* import React from "react";
import EventSlideShow from "../components/events/EventSlideShow";
import ArtSlideShow from "../components/artworks/ArtSlideShow";
import SearchBar from "../components/header & footer/SearchBar";
import { useDispatch } from "react-redux";
import { clearText } from "../store";
import { useEffect } from "react";

function HomePage() {
  const zIndexClass = "z-50";
  const zIndexEvent = "z-40 mb-3 mt-3";
  const zIndexArt = "z-40 mt-3";

  const inlineStyle = {
    backgroundImage:
      "url(https://wallpapers.com/images/hd/louvre-art-museum-eibcgjqsiti7p69m.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  return (
    <div style={inlineStyle}>
      <div className={zIndexClass}>
        <SearchBar />
      </div>
      <div className={zIndexEvent}>
        <EventSlideShow />
      </div>
      <div className={zIndexArt}>
        <ArtSlideShow />
      </div>
    </div>
  );
}

export default HomePage;

*/

import React from "react";
import EventSlideShow from "../components/events/EventSlideShow";
import ArtSlideShow from "../components/artworks/ArtSlideShow";
import SearchBar from "../components/header & footer/SearchBar";
import { useDispatch } from "react-redux";
import { clearText } from "../store";
import { useEffect } from "react";

function HomePage() {
  const zIndexEvent = "z-40 mb-3 mt-3";
  const zIndexArt = "z-40 mt-3";



  const welcomeTextStyle = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  };

  const BackgroundStyle = {
    backgroundColor: "bg-white", 
  };

  const highlightedBoxStyle = {
    borderRadius: "10px",
    color: "blue",
    textAlign: "center",
    fontSize: "40px",
    fontWeight: "bold",
    maxWidth: "400px",
    textShadow: "2px 2px 5px #0066ff",
    margin: "40px auto", 
  };

  const lineStyle = {
    width: "60%",
    margin: "auto",
    borderBottom: "2px solid blue", // Colore della linea
    marginBottom: "1px",  // Spazio tra la scritta e la linea
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  return (
    <div style={BackgroundStyle}>
      <div className="custom-image-container" style={{ position: "relative" }}>
        <img
          src="https://cdn.sanity.io/images/cctd4ker/production/644670e7c77a813b8fc7d6dfa427beefacad4684-3840x2160.jpg?w=3840&q=75&fit=clip&auto=format"
          alt="Custom Image"
          style={{ width: "100%", height: "550px", objectFit: "cover" }}
        />
        <SearchBar />
        {/* Primo box blu con scritte sotto la barra di ricerca */}
        <div style={highlightedBoxStyle}>
          Highlighted Events
        </div>
        <div style={lineStyle}></div> {/* Linea sotto "Highlighted Events" */}
        {/* Aggiunta della scritta "WELCOME TO MET" */}
        <div style={welcomeTextStyle}>WELCOME TO MET</div>
      </div>
      {/* Primo carosello */}
      <div className={zIndexEvent}>
        <EventSlideShow />
      </div>
      
      {/* Nuovo blocco di codice */}
      <p className="text-gray-500 dark:text-gray-400"></p>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-[120vh] h-2 my-8 bg-gray-500 border-0 rounded dark:bg-gray-700" />
        <div className="absolute px-4 -translate-x-1/2 left-1/2 dark:bg-gray-900">
          <svg className="w-8 h-8 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400"></p>
      
      {/* Secondo box blu con scritte */}
      <div style={highlightedBoxStyle}>
        <p>Highlighted Artworks</p>
      </div>
      <div style={lineStyle}></div> {/* Linea sotto "Highlighted Artworks" */}
      <div className={zIndexArt}>
        <ArtSlideShow />
      </div>
    </div>
  );
}

export default HomePage;











