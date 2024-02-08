import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { GoChevronDown } from "react-icons/go";
import Panel from "./FilterDropdownPanel";
import { addFilterItem } from "../../store";

function Dropdown({ option, title }) {
  const optionClass = "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer p-1 border-b border-blue-200";
  const containerClass = "w-48 relative";
  const panelClass = "flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-[#77aaff] w-full text-white";
  const chevronClass = "text-lg";
  const openedPanelClass = "absolute top-full overflow-y-auto max-h-[150px]";

  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    dispatch(
      addFilterItem({ filterName: "filterSelection", valueToAdd: option.label })
    );
  };

  const renderedOptions = option.map((option) => {
    return (
      <div
        className={optionClass}
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className={containerClass}>
      <div className={panelClass} onClick={handleClick}>
        {title}
        <GoChevronDown className={chevronClass} />
      </div>
      {isOpen && <Panel className={openedPanelClass}>{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
