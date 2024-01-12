import { useState, useEffect } from 'react';
import classNames from 'classnames';


function SliderDropdownPanel({option,className, onChange }) {

    const [text, setText] = useState(option.min.toString());
    const [value, setSliderValue]=useState(option.min);

    const handleChange = (event) => {
        setText(event.target.value)
        if(event.target.value == ""){
            setSliderValue(option.min)
        } else {
            setSliderValue(event.target.value)
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onChange(text);
        setText(option.min.toString())
        setSliderValue(option.min)
    }


    const handleSliderChange = (event) => {
        setSliderValue(event.target.value)
        setText(event.target.value)
        //console.log("Valore rilasciato dello slider:", value);
    }

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white w-full',
        className
        );

    return (
        <div className={finalClassNames}>
            <form onSubmit={handleSubmit}>
                <label className='p-2'>Insert end year</label>
                <input type='number' className={finalClassNames} value={text} onChange={handleChange} min={option.min} max={option.max} />
                <div className='p-2'>
                    <input type="range" min={option.min} max={option.max} value={value}
                        onChange={handleSliderChange} 
                    />
                </div>
            </form>
        </div>
    ) 
}

export default SliderDropdownPanel;