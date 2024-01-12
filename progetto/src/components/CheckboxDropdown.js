import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import CheckboxDropdownPanel from "./CheckboxDropdownPanel";

function CheckboxDropdown({options,value,onChange,onDelete,title}){

    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
            if(!divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click",handler,true);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (value) => {
        console.log("NAZIONALITA':", value);
        onChange(value);
    }

    const handleOptionClickRemove = (value) => {
        console.log("RIMOSSA:", value);
        onDelete(value);
    }

    return(
        <div ref={divEl} className="w-48 relative">
            <div className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full" onClick={handleClick}>
                {title}
                <GoChevronDown className="text-lg" />
            </div>
            {isOpen && <CheckboxDropdownPanel className="absolute top-full" options={options} onCheckboxChange={handleOptionClick} onCheckboxChangeReverse={handleOptionClickRemove}/>}
        </div>
    );

}

export default CheckboxDropdown;