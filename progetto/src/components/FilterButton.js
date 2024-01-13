import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

function FilterButton({ children, onRemove }) {

    return (
        <div className="hover:bg-sky-100 rounded p-2 text-sm border bg-white inline-flex items-center m-1">
            <div className="mr-1 cursor-pointer" onClick={() => onRemove()}>
                <FaTimes />
            </div>
            <div>
                {children}
            </div>
        </div>
    );

    /*
    return (
        <div
            className="hover:bg-sky-100 rounded cursor-pointer p-2 text-sm border bg-white inline-block m-1"
            onClick={onClick}
        >
            {children}
        </div>
    );
    */

}

export default FilterButton;