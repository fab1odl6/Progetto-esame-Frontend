import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import InputDropdownPanel from "./InputDropdownPanel";

function InputDropdown({ option, title }) {
  const containerClass = "w-48 relative z-8";
  const inputClass =
    "flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full";
  const chevronClass = "text-lg";
  const openedContainerClass = "absolute top-full w-full";
  const InputDropdownPanelClass = "flex justify-between items-center z-8";

  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef(null);

  const labelOptions = option.map((op) => op.label);

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
      <div className={inputClass} onClick={handleClick}>
        {title}
        <GoChevronDown className={chevronClass} />
      </div>
      {isOpen && (
        <div className={openedContainerClass}>
          <InputDropdownPanel
            className={InputDropdownPanelClass}
            options={labelOptions}
          />
        </div>
      )}
    </div>
  );
}

export default InputDropdown;
