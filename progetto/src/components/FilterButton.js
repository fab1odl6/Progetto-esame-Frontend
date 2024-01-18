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

}

export default FilterButton;