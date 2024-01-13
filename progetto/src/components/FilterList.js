import { useState, useEffect } from "react";
import FilterDropdown from "../components/FilterDropdown";
import InputDropdown from "./InputDropdown";
import SliderDropdown from "./SliderDropdown";
import CheckboxDropdown from "./CheckboxDropdown";
import SelectedFilters from "./SelectedFilters";

function FilterList({ artworks }) {

    const [filters, setFilters] = useState({
        filterInput: [],
        filterSelection: [],
        filterSlider: [],
        filterCheckbox: [],
      });

    const handleInputAuthor = (inputText) => {
        setFilters((prevFilters) => {
            if (!prevFilters.filterInput.includes(inputText)) {
                return {
                    ...prevFilters,
                    filterInput: [...prevFilters.filterInput, inputText],
                };
            }
            return prevFilters;
        });
    };
    
    useEffect(() => {
        console.log("AUTORE INSERITO:", filters.filterInput);
    }, [filters.filterInput]);

    const handleSelect = (option) => {
        setFilters((prevFilters) => {
            if (!prevFilters.filterSelection.includes(option)) {
                return {
                    ...prevFilters,
                    filterSelection: [...prevFilters.filterSelection, option],
                };
            }
            return prevFilters;
        });
    }

    useEffect(() => {
        console.log("SCELTA:", filters.filterSelection);
    }, [filters.filterSelection]);

    const handleInputEndDate = (inputYear) => {
        setFilters((prevFilters) => {
            if (!prevFilters.filterSlider.includes(inputYear)) {
                return {
                    ...prevFilters,
                    filterSlider: [...prevFilters.filterSlider, inputYear],
                };
            }
            return prevFilters;
        });
    }

    useEffect(() => {
        console.log("ANNO:", filters.filterSlider);
      }, [filters.filterSlider]);

    const handleCheckBox = (nationality) => {
        setFilters((prevFilters) => {
            if (!prevFilters.filterCheckbox.includes(nationality)) {
                return {
                    ...prevFilters,
                    filterCheckbox: [...prevFilters.filterCheckbox, nationality],
                };
            }
            return prevFilters;
        });
    }

    /*
    const removalHandleCheckbox = (elementToRemove) => {
        setFilters((prevFilters) => {
            // Filtra gli elementi diversi da elementToRemove
            const updatedFilterCheckbox = prevFilters.filterCheckbox.filter(
                (element) => element !== elementToRemove
            );
    
            return {
                ...prevFilters,
                filterCheckbox: updatedFilterCheckbox,
            };
        });
    };
    */

    useEffect(() => {
        console.log("CHECKBOX:", filters.filterCheckbox);
      }, [filters.filterCheckbox]);

    const removalHandle = (elementToRemove,filterName) => {
        setFilters((prevFilters) => {
            // Filtra gli elementi diversi da elementToRemove
            const updatedFilter = prevFilters[filterName].filter(
                (element) => element !== elementToRemove
            );
    
            return {
                ...prevFilters,
                [filterName]: updatedFilter,
            };
        });
    };

    //NOMI ARTISTI DA ASSEGNARE AL FILTRO
    const artworkAuthors = artworks.reduce((uniqueAuthors, artwork) => {
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

    //CATEGORIE DI ARTWORKS FILTRO
    const artworkType = artworks.reduce((uniqueTypes, artwork) => {
        const isDuplicate = uniqueTypes.some(type => type.value === artwork.type);
        if (isDuplicate) {
            return uniqueTypes;
        }
        return [
            ...uniqueTypes,
            {
                label: artwork.type,
                value: artwork.type,
            }
        ];
    }, []);


    //CALCOLO ANNO MAX E MIN PER FILTRO
    const artworkYears = artworks.map((artwork) => {
        return parseInt(artwork.date,10)
    })

    function findMinMax(numbers) {
        const filteredNumbers = numbers.filter(num => !isNaN(num));
        const max = Math.max(...filteredNumbers);
        const min = Math.min(...filteredNumbers);      
        return { max, min };
    }

    const intervalYears = findMinMax(artworkYears)


    //NAZIONALITA' DELLE OPERE
    const nations = artworks.reduce((uniqueNations, artwork) => {
        const countryBeforeComma = artwork.country.split(',')[0].trim();
        const isDuplicateOrEmpty = uniqueNations.some(nation => nation.value === countryBeforeComma) || countryBeforeComma === '';
        if (isDuplicateOrEmpty) {
            return uniqueNations;
        }
        return [
            ...uniqueNations,
            {
                label: countryBeforeComma,
                value: countryBeforeComma,
            }
        ];
    }, []);

    const combinedFilters = Object.entries(filters).flatMap(([filterName, filterValues]) => {
        return filterValues.map(filterValue => ({
            filterName,
            filterValue,
        }));
    });

    console.log("ALL",combinedFilters)

    return (
        <div> 
            <div className="mt-4 justify-center align-center flex">
                <InputDropdown option={artworkAuthors} value={filters.filterInput} onChange={handleInputAuthor} title="Author"/>
                <FilterDropdown option={artworkType} value={filters.filterSelection} onChange={handleSelect} title="Artwork type"/>
                <SliderDropdown option={intervalYears} value={filters.filterSlider} onChange={handleInputEndDate} title="End Date"/>
                <CheckboxDropdown options={nations} value={filters.filterCheckbox} onChange={handleCheckBox} onDelete={removalHandle} title="Nationality"/>
            </div>
            <div>
                {combinedFilters.length > 0 && (
                    <SelectedFilters filters={combinedFilters} onRemove={removalHandle}/>
                )}
            </div>
        </div>
    )
}

export default FilterList;