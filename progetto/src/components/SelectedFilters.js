import FilterButton from "./FilterButton";
import classNames from 'classnames';

function SelectedFilters({filters, onRemove}){

    const handleFilterRemove = (filter) => {
        // Aggiungi qui la logica per gestire il clic del filtro se necessario
        console.log("Filtro cliccato:", filter);
        onRemove(filter.filterValue,filter.filterName)
    };

    const renderedFilters = filters.map((filter, index) => {
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