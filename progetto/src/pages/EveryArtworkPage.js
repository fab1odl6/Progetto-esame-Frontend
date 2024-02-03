import React, { useEffect, useState } from "react";
import ArtGrid from "../components/artworks/ArtGrid";
import FilterList from "../components/filters/FilterList";
import SearchBar from "../components/header & footer/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { clearText } from "../store";
import { FaTimes } from "react-icons/fa";
import { setEveryArtworkPage } from "../store";
import { animateScroll as scroll } from 'react-scroll';

function EveryArtworkPage() {
  const pageContainerStyle = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    position: "relative",
  };

  const searchBarClass = "z-50 relative";
  const filterListClass = "z-50 relative";
  const containerStateClass =
    "z-10 relative flex items-center mt-4 bg-gray-200";
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

  //NEW
  //const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useSelector((state) => state.activePage.everyArtworkPage)
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

  const currentItems = filteredArray.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!searchState) {
      dispatch(clearText());
    }
  }, []);

  const handleRemove = () => {
    dispatch(clearText());
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setEveryArtworkPage(pageNumber))
    scroll.scrollToTop();
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          margin: "0", 
        }}
      >
        <img
          src="https://www.exibart.com/repository/media/2019/09/00094701.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(50%)",
            margin: "0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "2em",
            zIndex: 1,
          }}
        >
          EVERY ARTWORKS
        </div>
      </div>
  
      <div style={{ ...pageContainerStyle, marginTop: 0 }}> {/* Aggiungi marginTop: 0 */}
        {/* Rimuovi il secondo div */}
        <div className={searchBarClass}>
        <SearchBar />
      </div>
      <div className={filterListClass} style={{ position: 'relative', zIndex: 51 }}>
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
      <div className={`${artGridClass} max-w-screen-xl mx-auto flex flex-col items-center relative`}>
        <ArtGrid artworks={currentItems} />
        <div className="mt-4 flex items-center">
          <button
            className={buttonClass}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="flex items-center px-2 py-1 bg-gray-300 rounded ml-3">{currentPage}</p>
          <button
            className={buttonClass}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= filteredArray.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EveryArtworkPage;
