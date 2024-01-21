/*import SearchIcon from '@mui/icons-material/Search';
import className from "classnames";
import { useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavigationContext from '../../context/navigation';
import { updateText } from '../../store';


function SearchBar() {

    const searchBarHeaderClass = className("justify-center align-center flex relative z-10");
    const searchBarClass = className("mt-5 h-1/6 w-5/6 text-gray-500 relative");
    const formClass = "flex items-center";
    const searchDivClass = 'relative flex items-center w-full';
    const searchIconClass = className("absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-blue-500");
    const finalClassNamesClass = className("border rounded p-2 shadow bg-white w-full pl-8 relative");
    const ml2Class = 'ml-2';
    const matchedPanelClass = "matched-panel absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-300";
    const valueClass = className("cursor-pointer", finalClassNamesClass);


    const { navigate } = useContext(NavigationContext);
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [matchedValues, setMatchedValues] = useState([]);
    const { array } = useSelector((state) => {
        return state.artworks;
    });



    const handleChange = (event) => {
        const inputValue = event.target?.value;
        setText(inputValue)
        // Filtra i valori corrispondenti
        const matches = array.filter(value => value.title.toLowerCase().includes(inputValue.toLowerCase()));
        setMatchedValues(matches);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //onSearch(text);
        dispatch(updateText(text));
        setText("");
        navigate('/everyArtwork');
    }

    const handleSelect = (selectedValue) => {
        setText(selectedValue.title);
        setMatchedValues([]);
    }

    return (
        <div className={searchBarHeaderClass}>
            <div className={searchBarClass}>
                <form onSubmit={handleSubmit} className={formClass}>
                    <div className={searchDivClass}>
                        <input className={finalClassNamesClass} value={text} onChange={handleChange} placeholder='Search...' />
                        <div className={ml2Class}>
                            <SearchIcon className={searchIconClass} onClick={handleSubmit} />
                        </div>
                    </div>
                    {text && matchedValues.length > 0 && (
                        <div className={matchedPanelClass}>
                            {matchedValues.slice(0, 3).map((value, index) => (
                                <div className={valueClass} key={index} onClick={() => handleSelect(value)}>
                                    {value.title}
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )

}

export default SearchBar;

*/

//import SearchIcon from '@mui/icons-material/Search';
import classNames from "classnames";
import { useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavigationContext from '../../context/navigation';
import { updateText } from '../../store';

function SearchBar() {
    const searchBarHeaderClass = classNames("flex justify-center items-center relative z-10");
    const searchBarClass = classNames("mt-5 w-5/6 text-gray-500 relative");
    const formClass = "flex items-center w-full";
    const searchDivClass = 'relative flex items-center w-full';
   // const searchIconClass = classNames("absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer text-blue-500");
    const finalClassNamesClass = classNames("border rounded p-2 shadow bg-white w-full pl-8 relative");
    const ml2Class = 'ml-2';
    const matchedPanelClass = "matched-panel absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-300";
    const valueClass = classNames("cursor-pointer", finalClassNamesClass);
    const searchButtonClass = classNames(`${ml2Class} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute right-0 top-1/2 transform -translate-y-1/2 h-full`);

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
        const matches = array.filter(value => value.title.toLowerCase().includes(inputValue.toLowerCase()));
        setMatchedValues(matches);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateText(text));
        setText("");
        navigate('/everyArtwork');
    }

    const handleSelect = (selectedValue) => {
        setText(selectedValue.title);
        setMatchedValues([]);
    }

    return (
        <div className={searchBarHeaderClass}>
            <div className={searchBarClass}>
                <form onSubmit={handleSubmit} className={formClass}>
                    <div className={searchDivClass}>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                className={finalClassNamesClass}
                                value={text}
                                onChange={handleChange}
                                placeholder='Search Artworks..'
                                required
                            />
                            <button type="submit" className={searchButtonClass}>
                                Search
                            </button>
                        </div>
                        {text && matchedValues.length > 0 && (
                            <div className={matchedPanelClass}>
                                {matchedValues.slice(0, 3).map((value, index) => (
                                    <div className={valueClass} key={index} onClick={() => handleSelect(value)}>
                                        {value.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;