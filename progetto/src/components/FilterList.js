import { useState } from "react";
import FilterDropdown from "../components/FilterDropdown";
import InputDropdown from "./InputDropdown";
import SliderDropdown from "./SliderDropdown";
import CheckboxDropdown from "./CheckboxDropdown";

function FilterList({ artworks }) {

    const [filterInput, setSelectionInput] = useState(null);
    const [filterSelection, setSelection] = useState(null);
    const [filterSlider, setSelectionSlider] = useState(null);
    const [filterCheckbox, setSelectionCheckbox] = useState(null);

    console.log("DENTRO: ",artworks)

    const handleInputAuthor = (inputText) => {
        setSelectionInput(inputText);
        console.log("AUTORE INSERITO:", filterInput);
    }

    const handleSelect = (option) => {
        setSelection(option);
        console.log("SCELTA:", filterSelection)
    }

    const handleInputEndDate = (inputYear) => {
        setSelectionSlider(inputYear);
        console.log("ANNO:", filterSlider)
    }

    const handleCheckBox = (nationality) => {
        setSelectionCheckbox(nationality);
        console.log("CHECKBOX:", filterCheckbox)
    }

    const artworkInput = artworks.reduce((uniqueAuthors, artwork) => {
        // Verifica se l'artista è già presente nelle opzioni
        const isDuplicate = uniqueAuthors.some(author => author.value === artwork.authorName);
        // Se è un duplicato, salta l'aggiunta
        if (isDuplicate) {
            return uniqueAuthors;
        }
        // Altrimenti, aggiungi l'artista alle opzioni
        return [
            ...uniqueAuthors,
            {
                label: artwork.authorName,
                value: artwork.authorName,
            }
        ];
    }, []);

    //SOSTITUIRE NOME AUTORE CON NUOVO CAMPO!!!!!
    const artworkType = artworks.reduce((uniqueAuthors, artwork) => {
        // Verifica se l'artista è già presente nelle opzioni
        const isDuplicate = uniqueAuthors.some(author => author.value === artwork.authorName);
        // Se è un duplicato, salta l'aggiunta
        if (isDuplicate) {
            return uniqueAuthors;
        }
        // Altrimenti, aggiungi l'artista alle opzioni
        return [
            ...uniqueAuthors,
            {
                label: artwork.authorName,
                value: artwork.authorName,
            }
        ];
    }, []);

    const artworkYears = artworks.map((artwork) => {
        return parseInt(artwork.date,10)
    })

    function findMinMax(numbers) {
        // Filtra gli elementi NaN
        const filteredNumbers = numbers.filter(num => !isNaN(num));
        // Trova il massimo e il minimo
        const max = Math.max(...filteredNumbers);
        const min = Math.min(...filteredNumbers);      
        // Restituisci un oggetto con i valori massimo e minimo
        return { max, min };
    }

    console.log(artworkYears)
    const intervalYears = findMinMax(artworkYears)
    console.log(intervalYears.min)


    //console.log(artworkType)

    /*
    const options1 = [
        { label: "Author", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];
    */

    /*
    const options2 = [
        { label: "Historical period", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];
    */

    /*
    const options4 = [
        { label: "End date", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];
    */

    const options5 = [
        { label: "Reds", value: "red"},
        { label: "Greens", value: "green"},
        { label: "Blues", value: "blue"},
        { label: "Test", value: "test"}
    ];

    return (
        <div> 
            <div className="mt-4 justify-center align-center flex">
                <InputDropdown option={artworkInput} value={filterInput} onChange={handleInputAuthor} title="Author"/>
                <FilterDropdown option={artworkType} value={filterSelection} onChange={handleSelect} title="Historical Period"/>
                <SliderDropdown option={intervalYears} value={filterSlider} onChange={handleInputEndDate} title="End Date"/>
                <CheckboxDropdown options={options5} value={filterCheckbox} onChange={handleCheckBox} title="Nationality"/>
            </div>
        </div>
    )
}

export default FilterList;