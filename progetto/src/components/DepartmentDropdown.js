import React, { useState } from 'react';
import { firebaseConfig } from './FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";


const options = [];
async function readData() {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());

    const depRef = child(dbRef, "departments");
    try {
        const snapshot = await get(depRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
                options.push(data[key].name);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

await readData();


function Dropdown({ onOptionSelect }) {

    const dropdownContainerClass = "relative inline-block text-left";
    const triggerClass = "flex items-center cursor-pointer";
    const spanClass = "mr-2";
    const chevronIconClass = "text-xl";
    const optionsListClass = "z-10 absolute left-0 mt-2 bg-white border rounded shadow-md overflow-y-auto max-h-60";
    const optionItemClass = "cursor-pointer px-4 py-2 hover:bg-gray-100 border";

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggleDropdown = function () {
        setExpanded(!expanded);
    }

    const handleSelection = function (option) {
        setSelected(option);
        setExpanded(false);
        onOptionSelect(option);
    }

    return (
        <div className={dropdownContainerClass}>
            <div className={triggerClass} onClick={toggleDropdown}>
                <span className={spanClass}>Select a Department</span>
                {expanded ? (
                    <GoChevronDown className={chevronIconClass} />
                ) : (
                    <GoChevronLeft className={chevronIconClass} />
                )}

            </div>
            {expanded && (
                <ul className={optionsListClass}>
                    {options.map((option, index) => (
                        <li key={index} className={optionItemClass} onClick={() => handleSelection(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

};

export default Dropdown;
