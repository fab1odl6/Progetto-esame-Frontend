import { useState, useEffect } from "react";
import FilterDropdown from "../components/FilterDropdown";
import InputDropdown from "./InputDropdown";
import SliderDropdown from "./SliderDropdown";
import CheckboxDropdown from "./CheckboxDropdown";
import SelectedFilters from "./SelectedFilters";

function FilterList({ artworks, filters, handleInput, removalHandle }) {
    
    /*
    useEffect(() => {
        console.log("AUTORE INSERITO:", filters.filterInput);
    }, [filters.filterInput]);

    useEffect(() => {
        console.log("SCELTA:", filters.filterSelection);
    }, [filters.filterSelection]);

    useEffect(() => {
        console.log("ANNO:", filters.filterSlider);
    }, [filters.filterSlider]);

    useEffect(() => {
        console.log("CHECKBOX:", filters.filterCheckbox);
    }, [filters.filterCheckbox]);
    */

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
        <div className="z-9"> 
            <div className="mt-4 justify-center align-center flex z-9">
                <InputDropdown option={artworkAuthors} value={filters.filterInput} onChange={handleInput} title="Author"/>
                <FilterDropdown option={artworkType} value={filters.filterSelection} onChange={handleInput} title="Artwork type"/>
                <SliderDropdown option={intervalYears} value={filters.filterSlider} onChange={handleInput} title="End Date"/>
                <CheckboxDropdown options={nations} value={filters.filterCheckbox} onChange={handleInput} onDelete={removalHandle} title="Nationality"/>
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