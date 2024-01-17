import FilterButton from "./FilterButton";
import { useDispatch } from "react-redux";
import { removeFilterItem } from "../HomePage/store";

function SelectedFilters({filters}){

    const dispatch = useDispatch();

    const handleFilterRemove = (filter) => {
        dispatch(removeFilterItem({ filterName: filter.filterName, valueToRemove: filter.filterValue }))
    };

    const renderedFilters = filters.map((filter) => {
        let labelText = '';

        switch (filter.filterName) {
            case 'filterInput':
                labelText = 'Author:';
                break;
            case 'filterSelection':
                labelText = 'Type:';
                break;
            case 'filterSlider':
                labelText = 'End Year:';
                break;
            case 'filterCheckbox':
                labelText = 'Nationality:';
                break;
            default:
                labelText = 'Unknown Filter:';
                break;
        }

        return (
            <FilterButton key={filter.filterValue} onRemove={() => handleFilterRemove(filter)}>
                {labelText} {filter.filterValue}
            </FilterButton>
        );
    });

    return (
        <div className="w-full mt-2 p-4 bg-gray-200">
            {renderedFilters}
        </div>
    );
}

export default SelectedFilters;