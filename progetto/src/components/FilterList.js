import { useState } from "react";
import FilterDropdown from "../components/FilterDropdown";
import InputDropdown from "./InputDropdown";
import SliderDropdown from "./SliderDropdown";
import CheckboxDropdown from "./CheckboxDropdown";

function FilterList() {

    const [selection1, setSelectionInput] = useState(null);
    const [selection2, setSelection] = useState(null);
    const [selection3, setSelectionSlider] = useState(null);
    const [selection4, setSelectionCheckbox] = useState(null);

    const handleInputAuthor = (inputText) => {
        setSelectionInput(inputText);
        console.log("AUTORE INSERITO:", selection1);
    }

    const handleSelect = (option) => {
        setSelection(option);
        console.log("SCELTA:", selection2)
    }

    const handleInputEndDate = (inputYear) => {
        setSelectionSlider(inputYear);
        console.log("ANNO:", selection3)
    }

    const handleCheckBox = (nationality) => {
        setSelectionCheckbox(nationality);
    } 

    const options1 = [
        { label: "Author", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];

    const options2 = [
        { label: "Historical period", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];

    const options4 = [
        { label: "End date", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];

    const options5 = [
        { label: "Reds", value: "red"},
        { label: "Greens", value: "green"},
        { label: "Blues", value: "blue"},
        { label: "Test", value: "test"}
    ];

    return (
        <div> 
            <div className="mt-4 justify-center align-center flex">
                <InputDropdown value={selection1} onChange={handleInputAuthor} title="Author"/>
                <FilterDropdown options={options2} value={selection2} onChange={handleSelect} title="Historical Period"/>
                <SliderDropdown value={selection3} onChange={handleInputEndDate} title="End Date"/>
                <CheckboxDropdown options={options5} value={selection4} onChange={handleCheckBox} title="Nationality"/>
            </div>
        </div>
    )
}

export default FilterList;