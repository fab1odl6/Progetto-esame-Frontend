import SearchIcon from '@mui/icons-material/Search';
import className from "classnames";
import { useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavigationContext from '../../context/navigation';
import { updateText } from '../../store';


function SearchBar() {

    const searchBarHeaderClass = className("justify-center align-center flex relative z-40");
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