import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import InputDropdownPanel from "./InputDropdownPanel";

function InputDropdown({ option, title }) {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef(null);

    const labelOptions = option.map(op => op.label)

    useEffect(() => {
        const handler = (event) => {
            if(divEl.current && !divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click",handler,true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, [divEl.current]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div ref={divEl} className="w-48 relative z-8">
            <div className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full" onClick={handleClick}>
                {title}
                <GoChevronDown className="text-lg" />
            </div>
            {isOpen && (
                <div className="absolute top-full w-full">
                   <InputDropdownPanel className="flex justify-between items-center z-8" options={labelOptions} /> 
                </div>
            )}
        </div>
    );
}

export default InputDropdown;