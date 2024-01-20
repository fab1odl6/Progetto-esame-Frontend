import { FaTimes } from 'react-icons/fa';


function FilterButton({ children, onRemove }) {

    const containerClass = "hover:bg-sky-100 rounded p-2 text-sm border bg-white inline-flex items-center m-1";
    const divClass = "mr-1 cursor-pointer";

    return (
        <div className={containerClass}>
            <div className={divClass} onClick={() => onRemove()}>
                <FaTimes />
            </div>
            <div>
                {children}
            </div>
        </div>
    );

}

export default FilterButton;