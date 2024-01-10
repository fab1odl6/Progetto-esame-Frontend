import { useState } from 'react';
import classNames from 'classnames';

function CheckboxDropdownPanel({className,options,onCheckboxChange}){

    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (option) => {
        const newCheckedItems = { ...checkedItems, [option.value]: !checkedItems[option.value] };
        setCheckedItems(newCheckedItems);
    
        if (onCheckboxChange) {
          onCheckboxChange(newCheckedItems);
        }
      };

    const finalClassNames = classNames(
        'border rounded p-3 shadow bg-white w-full',
        className
      );
    
      return (
        <div className={finalClassNames}>
            {options.map(option => (
                <div key={option.value}>        
                    <label className="hover:bg-sky-100 rounded cursor-pointer p-1 w-full" key={option.value}>
                        <input
                            type="checkbox"
                            checked={checkedItems[option.value] || false}
                            onChange={() => handleCheckboxChange(option)}
                            className='mr-2'
                        />
                            {option.label}
                    </label>
                </div>
          ))}
        </div>
      );

}

export default CheckboxDropdownPanel;