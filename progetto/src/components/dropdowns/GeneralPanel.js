import SliderDropdownPanel from "./SliderDropdownPanel"
import CheckboxDropdownPanel from "./CheckboxDropdownPanel";
import FilterDropdownPanel from "./FilterDropdownPanel";
import InputDropdownPanel from "./InputDropdownPanel";
import { addFilterItem } from "../../store";
import { useDispatch } from "react-redux";

function GeneralPanel({options,title, setIsOpen}){

    const openedDivClass = "absolute top-full w-full";
    const SliderDropdownPanelClass = "flex justify-between items-center";
    const panelClass = "absolute top-full overflow-y-auto max-h-[150px]"
    const optionClass = "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer p-1 border-b border-blue-200";
    const InputDropdownPanelClass = "flex justify-between items-center z-8";

    const dispatch = useDispatch();

    if(title == "Author"){
        const labelOptions = options.map((op) => op.label);

        return(
            <div className={openedDivClass}>
                <InputDropdownPanel className={InputDropdownPanelClass} options={labelOptions} />
            </div>
        )
        
    } else if (title =="Artwork type"){
        const handleOptionClick = (option) => {
            setIsOpen(false);
            dispatch(
              addFilterItem({ filterName: "filterSelection", valueToAdd: option.label })
            );
        };
        
        const renderedOptions = options.map((option) => {
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
            <FilterDropdownPanel className={panelClass}>{renderedOptions}</FilterDropdownPanel>
        )       

    } else if(title == "End Year"){
        return(
            <div className={openedDivClass}>
                <SliderDropdownPanel options={options} className={SliderDropdownPanelClass}/>
        </div>
        )
    } else if(title == "Nationality") {
        return(
            <CheckboxDropdownPanel className={panelClass} options={options} />
        )

    }
}

export default GeneralPanel