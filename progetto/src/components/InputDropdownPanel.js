import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { addFilterItem } from '../HomePage/store';


function InputDropdownPanel({className, options }) {

  const [text, setText] = useState("");
  const [matchedValues, setMatchedValues] = useState([]);
  const dispatch = useDispatch();

  const finalClassNames = classNames('border rounded p-2 shadow bg-white w-full', className);

  const handleChange = (event) => {
    const inputValue = event.target?.value;
    setText(inputValue)
    // Filtra i valori corrispondenti
    const matches = options.filter(value => value.toLowerCase().includes(inputValue.toLowerCase()));
    setMatchedValues(matches);
  }

  const handleSelect = (selectedValue) => {
    setText(selectedValue);
    setMatchedValues([]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addFilterItem({ filterName: "filterInput", valueToAdd: text }));
    setText("");
  }

  return (
    <div className={finalClassNames}>
      <form onSubmit={handleSubmit}>
        <label className='p-2'>Insert author name</label>
        <input className={finalClassNames} value={text} onChange={handleChange} />
        {text && matchedValues.length > 0 && (
          <div className="matched-panel">
            {matchedValues.slice(0,3).map((value, index) => (
              <div className={`cursor-pointer ${finalClassNames}`} key={index} onClick={() => handleSelect(value)}>
                {value}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
   ) 
}

export default InputDropdownPanel;