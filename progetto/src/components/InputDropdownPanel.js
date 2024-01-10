import { useState } from 'react';
import classNames from 'classnames';


function InputDropdownPanel({className, onChange }) {

  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onChange(text);
    setText("");
  }

  const finalClassNames = classNames(
      'border rounded p-2 shadow bg-white w-full',
      className
    );

  return (
    <div className={finalClassNames}>
      <form onSubmit={handleSubmit}>
        <label className='p-2'>Insert author name</label>
        <input className={finalClassNames} value={text} onChange={handleChange} />
      </form>
    </div>
   ) 
}

export default InputDropdownPanel;