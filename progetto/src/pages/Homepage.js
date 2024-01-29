import React from "react";
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
    backgroundImage: "url(https://wallpapers.com/images/hd/louvre-art-museum-eibcgjqsiti7p69m.jpg)", 
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
