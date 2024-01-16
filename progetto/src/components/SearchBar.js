import SearchIcon from '@mui/icons-material/Search';
import className from "classnames";
import { useEffect, useState, useContext } from 'react';
import { useSelector } from "react-redux";
import { NavigationProvider } from "../context/navigation";
import Route from "./Route";
import Link from './Link';
import NavigationContext from '../context/navigation';


function SearchBar({onSearch}) {

    const { navigate } = useContext(NavigationContext);

    const [text, setText] = useState("");
    const [matchedValues, setMatchedValues] = useState([]);

    const { array } = useSelector((state) => {
        return state.artworks;
    });

    const searchBarHeader = className("justify-center align-center flex relative z-300");
    const searchBar = className("mt-5 h-1/6 w-5/6 text-gray-500 relative"); 
    const searchIcon = className("absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-blue-500");
    const finalClassNames = className("border rounded p-2 shadow bg-white w-full pl-8 relative"); 

    const handleChange = (event) => {
        const inputValue = event.target?.value;
        setText(inputValue)
        // Filtra i valori corrispondenti
        const matches = array.filter(value => value.title.toLowerCase().includes(inputValue.toLowerCase()));
        setMatchedValues(matches);

        console.log("MATCH: ",matches)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(text)
        onSearch(text)
        setText(""); 
          
        navigate('/everyArtwork');
    }

    const handleSelect = (selectedValue) => {
        setText(selectedValue.title);
        setMatchedValues([]);
    }

    /*
    <Link key="SearchArtwork" to="/everyArtwork">
                                <SearchIcon className={searchIcon} onClick={handleSubmit}/>
                            </Link>
    */

    return (
        <div className={searchBarHeader}>
            <div className={searchBar}>
                <form onSubmit={handleSubmit} className="flex items-center">
                    <div className='relative flex items-center w-full'>
                        <input className={finalClassNames}  value={text} onChange={handleChange} placeholder='Cerca...' />
                        <div className='ml-2'>
                            <SearchIcon className={searchIcon} onClick={handleSubmit}/>
                        </div>
                    </div>
                    {text && matchedValues.length > 0 && (
                        <div className="matched-panel absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-300">
                            {matchedValues.slice(0,3).map((value, index) => (
                                <div className={`cursor-pointer ${finalClassNames}`} key={index} onClick={() => handleSelect(value)}>
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