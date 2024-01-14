import SearchIcon from '@mui/icons-material/Search';
import className from "classnames";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { NavigationProvider } from "../context/navigation";
import Route from "./Route";
import Link from './Link';
import EveryArtworkPage from '../pages/EveryArtworkPage';


function SearchBar() {

    const [text, setText] = useState("");
    const [matchedValues, setMatchedValues] = useState([]);

    const { array } = useSelector((state) => {
        return state.artworks;
    });

    const searchBarHeader = className("justify-center align-center flex relative z-10");
    const searchBar = className("mt-5 h-1/6 w-5/6 text-gray-500 relative"); 
    const searchIcon = className("absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer");
    const finalClassNames = className("border rounded p-2 shadow bg-white w-full pl-8 relative"); 

    const links = [
        { label: "SearchArtwork", path: "/everyArtwork" },
        //{ label: "Every Artwork", path: "/everyArtwork" },
        //{ label: "Museums", path: "/museums" },
        //{ label: "Personal Gallery", path: "/personalGallery" },
        //{ label: "My Events", path: "/myEvents" },
        //{ label: "Handle Events", path: "/handleEvents" }
    ]

    


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
        setText("");
    }

    const handleSelect = (selectedValue) => {
        setText(selectedValue.title);
        setMatchedValues([]);
    }

    const renderedLinks = links.map((link) => {
        return (
            <div>
                <Link key={link.label} to={link.path}>
                    <SearchIcon className={searchIcon} onClick={handleSubmit}/>
                </Link>
            </div>
        );
    });

    return (
        <div className={searchBarHeader}>
            <div className={searchBar}>
                <form onSubmit={handleSubmit}>
                    <input className={finalClassNames} value={text} onChange={handleChange} placeholder='Cerca...' />
                    {renderedLinks}
                    {text && matchedValues.length > 0 && (
                        <div className="matched-panel absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-10">
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