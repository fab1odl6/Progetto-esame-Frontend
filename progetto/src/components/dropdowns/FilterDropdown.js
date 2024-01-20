import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { GoChevronDown } from "react-icons/go";
import Panel from "./FilterDropdownPanel";
import { addFilterItem } from "../../store";


function Dropdown({ option, title }) {

  const optionClass = "hover:bg-sky-100 rounded cursor-pointer p-1";
  const containerClass = "w-48 relative";
  const panelClass = "flex justify-between items-center cursor-pointer";
  const chevronClass = "text-lg";
  const openedPanelClass = "absolute top-full";


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
    dispatch(addFilterItem({ filterName: "filterSelection", valueToAdd: option.label }));
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
      <Panel
        className={panelClass}
        onClick={handleClick}
      >
        {title}
        <GoChevronDown className={chevronClass} />
      </Panel>
      {isOpen && <Panel className={openedPanelClass}>{renderedOptions}</Panel>}
    </div>
  );

}

export default Dropdown;