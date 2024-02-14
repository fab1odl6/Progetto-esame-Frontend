import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import GeneralPanel from "./GeneralPanel";

function GeneralDropdown({title, options}){
    const containerClass = "w-48 relative";
    const panelClass = "flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-[#77aaff] w-full text-white";
    const chevronClass = "text-lg";

    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (divEl.current && !divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handler, true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, [divEl.current]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={divEl} className={containerClass}>
            <div className={panelClass} onClick={handleClick}>
                {title}
                <GoChevronDown className={chevronClass} />
            </div>
            {isOpen && (
                <GeneralPanel options={options} title={title} setIsOpen={setIsOpen}/>
            )}
        </div>
    );
    
}

export default GeneralDropdown;