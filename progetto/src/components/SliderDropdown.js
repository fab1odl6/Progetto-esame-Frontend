import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import SliderDropdownPanel from "./SliderDropdownPanel";

function SliderDropdown({ value, onChange, title }) {
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

    const handleSliderValue = (value) => {
        //console.log("ANNO FINE:", value);
        onChange(value);
    }

    return(
        <div ref={divEl} className="w-48 relative">
            <div className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full" onClick={handleClick}>
                {title}
                <GoChevronDown className="text-lg" />
            </div>
            {isOpen && (
                <div className="absolute top-full w-full">
                   <SliderDropdownPanel className="flex justify-between items-center" onChange={handleSliderValue} /> 
                </div>
            )}
        </div>
    );
}

export default SliderDropdown;