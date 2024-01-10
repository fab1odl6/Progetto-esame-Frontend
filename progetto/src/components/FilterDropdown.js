import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./FilterDropdownPanel";
import InputDropdown from "./FilterDropdownInput";

function Dropdown({ options, value, onChange, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

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
    onChange(option);
  };

  const filterTitle = options[0].label

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

  /*
  const panelType = (type) => {
    if(type == "dropdown"){
      return(
        <div>
          <Panel
            className="flex justify-between items-center cursor-pointer"
            onClick={handleClick}
          >
            {value?.label || filterTitle}
            <GoChevronDown className="text-lg" />
          </Panel>
          {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
        </div>
      );
    } else if(type == "input") {
      return(
        <div>
          <InputDropdown />
          {isOpen && <InputDropdown className="absolute top-full">{renderedOptions}</InputDropdown>}
        </div>
        
      )
    } 
  }
  */

  /*
  if(type == "dropdown"){
    return(
      <div ref={divEl} className="w-48 relative">
        <Panel
          className="flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          {value?.label || filterTitle}
          <GoChevronDown className="text-lg" />
        </Panel>
        {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
      </div>
    );
  } else if(type == "input") {
    return(
      <div ref={divEl} className="w-48 relative">
        <InputDropdown className="flex justify-between items-center cursor-pointer" onClick={handleClick}>
          {value?.label || filterTitle}
          <GoChevronDown className="text-lg" />
        </InputDropdown>
        {isOpen && <InputDropdown className="absolute top-full" />}
      </div>
      
    )
  }
  */ 

  
  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || filterTitle}
        <GoChevronDown className="text-lg" />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
  
  

  /*
  return(
    <div ref={divEl} className="w-48 relative">
      <div>{panelType}</div>
    </div>
  )
  */

}

export default Dropdown;