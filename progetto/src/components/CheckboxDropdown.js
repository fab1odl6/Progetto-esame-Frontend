import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import CheckboxDropdownPanel from "./CheckboxDropdownPanel";

function CheckboxDropdown({options,value,onChange,title}){

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

    /*
    const renderedOptions = options.map((option, index) => {
        if(index != 0){
            return (
                <div
                  className="hover:bg-sky-100 rounded cursor-pointer p-1"
                  onClick={() => handleOptionClick(option)}
                  key={option.value}
                >
                    {option.label}
                </div>
              );
        }
      });
    */

    /*  
    return(
        <div ref={divEl} className="w-48 relative">
            <div className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full" onClick={handleClick}>
                {value?.label || "Nationality"}
                <GoChevronDown className="text-lg" />
            </div>
            {isOpen && <CheckboxDropdownPanel className="absolute top-full">{renderedOptions}</CheckboxDropdownPanel>}
        </div>
    );
    */
    return(
        <div ref={divEl} className="w-48 relative">
            <div className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full" onClick={handleClick}>
                {title}
                <GoChevronDown className="text-lg" />
            </div>
            {isOpen && <CheckboxDropdownPanel className="absolute top-full" options={options} onCheckboxChange={handleOptionClick}/>}
        </div>
    );

}

export default CheckboxDropdown;