import React, { useEffect } from "react";
import ArtGrid from "../components/artworks/ArtGrid";
import FilterList from "../components/filters/FilterList";
import SearchBar from "../components/header & footer/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { clearText } from "../store";
import { FaTimes } from "react-icons/fa";

function EveryArtworkPage() {
  const pageContainerStyle = {
    backgroundImage: 'url("https://images.alphacoders.com/133/1331567.png")', // Sostituisci con il percorso corretto dell'immagine
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    position: "relative",
  };

  const searchBarClass = "z-40 relative";
  const filterListClass = "z-30 relative";
  const containerStateClass = "z-10 relative flex items-center mt-4";
  const resultTextClass = "text-lg font-bold";
  const buttonClass =
    "flex items-center px-2 py-1 bg-gray-300 rounded cursor-pointer ml-3";
  const iconClass = "ml-1";
  const artGridClass = "z-auto relative";

  const { array } = useSelector((state) => {
    return state.artworks;
  });

  const dispatch = useDispatch();
  const filtersState = useSelector((state) => state.filters);
  const searchState = useSelector((state) => state.search.text);

  const filteredArray = array.filter((element) => {
    const matchesTitle =
      !searchState ||
      element.title.toLowerCase().includes(searchState.toLowerCase());
    const matchesAuthor =
      filtersState.filterInput.length === 0 ||
      filtersState.filterInput.some((input) =>
        element.authorName.includes(input)
      );
    const matchesType =
      filtersState.filterSelection.length === 0 ||
      filtersState.filterSelection.some((input) =>
        element.type.includes(input)
      );
    const matchesDate =
      filtersState.filterSlider.length === 0 ||
      filtersState.filterSlider.some(
        (input) => element.date.toString() === input
      );
    const matchesNationality =
      filtersState.filterCheckbox.length === 0 ||
      filtersState.filterCheckbox.some((input) =>
        element.country.includes(input)
      );

    return (
      matchesAuthor &&
      matchesType &&
      matchesNationality &&
      matchesDate &&
      matchesTitle
    );
  });

  useEffect(() => {
    if (!searchState) {
      dispatch(clearText());
    }
  }, []);

  const handleRemove = () => {
    dispatch(clearText());
  };

  return (
    <div style={pageContainerStyle}>
      <div className={searchBarClass}>
        <SearchBar />
      </div>
      <div className={filterListClass}>
        <FilterList artworks={array} />
      </div>
      {searchState && searchState.trim() !== "" && (
        <div className={containerStateClass}>
          <p className={resultTextClass}>Results for: {searchState}</p>
          <button className={buttonClass} onClick={handleRemove}>
            <FaTimes className={iconClass} />
            Clear
          </button>
        </div>
      )}
      <div className={artGridClass}>
        <ArtGrid artworks={filteredArray} />
      </div>
    </div>
  );
}

export default EveryArtworkPage;
