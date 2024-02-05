import classNames from "classnames";
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationContext from "../../context/navigation";
import { updateText } from "../../store";
import React from "react";

function SearchBar() {
  const cursorpointerClass =
    "cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800";
  const searchBarHeaderClass = classNames(
    "flex justify-center items-center relative z-10"
  );
  const searcboxClass =
    "absolute inset-y-0 left-3 flex items-center pointer-events-none";
  const iconpositionClass = "relative w-full";
  const searchtextClass = "w-4 h-4 text-gray-500 dark:text-gray-400";
  const searchBarClass = classNames("mt-5 w-5/6 text-gray-500 relative");
  const colorborerClass = "border-b border-blue-200";
  const formClass = "flex items-center w-full";
  const searchDivClass = "relative flex items-center w-full";
  const finalClassNamesClass = classNames(
    "border rounded p-2 shadow bg-white w-full pl-8 relative"
  );
  const ml2Class = "ml-2";
  const matchedPanelClass =
    "matched-panel absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-300 p-2 overflow-y-auto max-h-40";
  const bgbutton = "bg-[#77aaff]";
  const searchButtonClass = classNames(
    `${ml2Class} text-white ${bgbutton} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute right-0 top-1/2 transform -translate-y-1/2 h-full`
  );

  const { navigate } = useContext(NavigationContext);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [matchedValues, setMatchedValues] = useState([]);
  const { array } = useSelector((state) => {
    return state.artworks;
  });

  const handleChange = (event) => {
    const inputValue = event.target?.value;
    setText(inputValue);
    const matches = array.filter((value) =>
      value.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setMatchedValues(matches);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateText(text));
    setText("");
    navigate("/everyArtwork");
  };

  const handleSelect = (selectedValue) => {
    setText(selectedValue.title);
    setMatchedValues([]);
  };

  return (
    <div className={searchBarHeaderClass}>
      <div className={searchBarClass}>
        <form onSubmit={handleSubmit} className={formClass}>
          <div className={searchDivClass}>
            <div className={iconpositionClass}>
              <div className={searcboxClass}>
                <svg
                  className={searchtextClass}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                className={finalClassNamesClass}
                value={text}
                onChange={handleChange}
                placeholder="Search Artworks..."
              />
              <button type="submit" className={searchButtonClass}>
                Search
              </button>
            </div>
            {text && matchedValues.length > 0 && (
              <div className={matchedPanelClass}>
                {matchedValues.slice(0, 3).map((value, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={cursorpointerClass}
                      onClick={() => handleSelect(value)}
                    >
                      {value.title}
                    </div>
                    {index < matchedValues.length - 1 && (
                      <div className={colorborerClass}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
