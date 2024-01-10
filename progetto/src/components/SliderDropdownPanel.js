import { useState, useEffect } from 'react';
import classNames from 'classnames';


function SliderDropdownPanel({className, onChange }) {

    const [text, setText] = useState(0);
    const [value, setSliderValue]=useState(0);

    const handleChange = (event) => {
        setText(event.target.value)
        if(event.target.value == ""){
            setSliderValue(0)
        } else {
            setSliderValue(event.target.value)
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onChange(text);
        setText(0)
        setSliderValue(0)
    }


    const handleSliderChange = (event) => {
        setSliderValue(event.target.value)
        setText(event.target.value)
        //console.log("Valore rilasciato dello slider:", value);
    }

    /*
    const handleSliderRelease = () => {
        console.log("Valore FINE dello slider:", value);
        // Puoi eseguire l'azione desiderata qui
    }

    EVENTO onMouseUp={handleSliderRelease}
    */

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white w-full',
        className
        );

    return (
        <div className={finalClassNames}>
            <form onSubmit={handleSubmit}>
                <label className='p-2'>Insert end year</label>
                <input type='number' className={finalClassNames} value={text} onChange={handleChange} />
                <div className='p-2'>
                    <input type="range" min="1" max="500" value={value}
                        onChange={handleSliderChange} 
                    />
                </div>
            </form>
        </div>
    ) 
}

export default SliderDropdownPanel;