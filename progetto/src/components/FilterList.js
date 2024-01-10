import { useState } from "react";
import Dropdown from "../components/FilterDropdown";

function FilterList() {

    const [selection1, setSelection1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [selection3, setSelection3] = useState(null);
    const [selection4, setSelection4] = useState(null);
    const [selection5, setSelection5] = useState(null);

    /*
    const handleSelect = (option) => {
        setSelection(option);
    };
    */

    const handleSelect = (option, dropdownNumber) => {
        // Agisci in base al numero del dropdown
        switch (dropdownNumber) {
            case 1:
                setSelection1(option);
                break;
            case 2:
                setSelection2(option);
                break;
            case 3:
                setSelection3(option);
                break;
            case 4:
                setSelection4(option);
                break;
            case 5:
                setSelection5(option);
                break;
            default:
                break;
        }
    };

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

    const options3 = [
        { label: "Era", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];

    const options4 = [
        { label: "Completion date", value: ""},
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ];

    const options5 = [
        { label: "Nationality", value: ""},
        { label: "Reds", value: "red" },
        { label: "Greens", value: "green" },
        { label: "Blues", value: "blue" },
        { label: "Test", value: "test"}
    ];

    return (
        <div> 
            <div className="mt-4 justify-center align-center flex">
                <Dropdown options={options1} value={selection1} onChange={(value) => handleSelect(value, 1)} />
                <Dropdown options={options2} value={selection2} onChange={(value) => handleSelect(value, 2)} />
                <Dropdown options={options3} value={selection3} onChange={(value) => handleSelect(value, 3)} />
                <Dropdown options={options4} value={selection4} onChange={(value) => handleSelect(value, 4)} />
                <Dropdown options={options5} value={selection5} onChange={(value) => handleSelect(value, 5)} />
            </div>
        </div>
    )
}

export default FilterList;