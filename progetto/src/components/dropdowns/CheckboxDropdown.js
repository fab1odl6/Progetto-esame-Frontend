import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import CheckboxDropdownPanel from "./CheckboxDropdownPanel";

function CheckboxDropdown({ options, title }) {
  const containerClass = "w-48 relative";
  const textClass =
    "flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-[#77aaff] w-full text-white";
  const chevronClass = "text-lg";
  const panelClass = "absolute top-full overflow-y-auto max-h-[150px]";

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
      <div className={textClass} onClick={handleClick}>
        {title}
        <GoChevronDown className={chevronClass} />
      </div>
      {isOpen && (
        <CheckboxDropdownPanel className={panelClass} options={options} />
      )}
    </div>
  );
}

export default CheckboxDropdown;
