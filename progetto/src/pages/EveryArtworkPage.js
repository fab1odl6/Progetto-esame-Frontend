import React, { useEffect } from "react";
import ArtGrid from "../components/artworks/ArtGrid";
import FilterList from "../components/filters/FilterList";
import SearchBar from "../components/header & footer/SearchBar";
import PageButtons from "../components/header & footer/PageButtons";
import { useSelector, useDispatch } from "react-redux";
import { clearText, setPage } from "../store";
import { FaTimes } from "react-icons/fa";
import { setEveryArtworkPage } from "../store";

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
  const filterListClass ="z-50 relative";
  const containerStateClass ="z-10 relative flex items-center bg-gray-200 h-20";
  const resultTextClass = "text-lg font-bold p-4";
  const buttonClass ="flex items-center px-2 py-1 bg-[#77aaff] rounded cursor-pointer ml-3 text-white hover:bg-blue-800";
  const iconClass = "ml-1";
  const artGridClass ="z-auto relative max-w-screen-xl mx-auto flex flex-col items-center relative";
  const imageboxClass = "relative w-full h-200px overflow-hidden";
  const textonimageClass ="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold text-2xl z-10";

  const { array } = useSelector((state) => {
    return state.artworks;
  });

  const dispatch = useDispatch();

  const filtersState = useSelector((state) => state.filters);
  const searchState = useSelector((state) => state.search.text);
  const currentPage = useSelector((state) => state.activePage.everyArtworkPage);
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
      dispatch(setPage("/everyArtwork"));
    }
  }, []);

  const handleRemove = () => {
    dispatch(clearText());
  };

  useEffect(() =>{
    dispatch(setEveryArtworkPage(1));
  },[filtersState])

  return (
    <div className={pageContainerStyle}>
      <div className={imageboxClass}>
        <img
          src="https://www.exibart.com/repository/media/2019/09/00094701.jpg"
          style={{ maxHeight: "550px", width: "100%", objectFit: "cover" }}
          className="filter brightness-50"
          alt="Artwork"
        />
        <div className={textonimageClass}>EVERY ARTWORK</div>
      </div>
      <div className={searchBarClass} style={{ zIndex: 52 }}>
        <SearchBar />
      </div>
      <div
        className={filterListClass}
        style={{ position: "relative", zIndex: 51 }}
      >
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
        <ArtGrid artworks={currentItems} />
        <PageButtons indexOfLastItem={indexOfLastItem} filteredArray={filteredArray} currentPage={currentPage} page="EveryArtwork"/>
      </div>
    </div>
  );
}

export default EveryArtworkPage;
