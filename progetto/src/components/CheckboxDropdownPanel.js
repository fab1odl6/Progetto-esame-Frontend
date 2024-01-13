import { useState, useEffect } from 'react';
import classNames from 'classnames';

function CheckboxDropdownPanel({className,options,onCheckboxChange,onCheckboxChangeReverse,state}){

  const [checkedItems, setCheckedItems] = useState({});

  const finalClassNames = classNames('border rounded p-3 shadow bg-white w-full', className);

  useEffect(() => {
    // Inizializza checkedItems in base allo stato iniziale state
    const initialState = state.reduce((acc, value) => {
      acc[value] = true; // Imposta a true se vuoi che la checkbox sia selezionata inizialmente
      return acc;
    }, {});

    setCheckedItems(initialState);
  }, [state]);

  const handleCheckboxChange = (option) => {
    const newCheckedItems = { ...checkedItems, [option.value]: !checkedItems[option.value] };
    setCheckedItems(newCheckedItems);
    if (onCheckboxChange) {
      onCheckboxChange(option.value);
    }
  }

  const handleCheckboxRemoval= (option) => {
    const newCheckedItems = { ...checkedItems, [option.value]: !checkedItems[option.value] };
    setCheckedItems(newCheckedItems);
    if (onCheckboxChangeReverse) {
      onCheckboxChangeReverse(option.value);
    }      
  }
      
  return (
    <div className={finalClassNames}>
      {options.map(option => (
        <div key={option.value}>        
          <label className="hover:bg-sky-100 rounded cursor-pointer p-1 w-full" key={option.value}>
            <input
              type="checkbox"
              checked={checkedItems[option.value] || false}
              onChange={() => {
                if (checkedItems[option.value]) {
                  handleCheckboxRemoval(option);
                } else {
                  handleCheckboxChange(option);
                }
              }}
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