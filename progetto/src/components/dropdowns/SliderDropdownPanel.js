import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { addFilterItem } from "../../store";


function SliderDropdownPanel({ option, className }) {

    const finalClassNames = classNames('border rounded p-2 shadow bg-white w-full', className);
    const p2Class = 'p-2';


    const [text, setText] = useState(option.min.toString());
    const [value, setSliderValue] = useState(option.min);
    const dispatch = useDispatch();



    const handleChange = (event) => {
        setText(event.target.value)
        if (event.target.value == "") {
            setSliderValue(option.min)
        } else {
            setSliderValue(event.target.value)
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addFilterItem({ filterName: "filterSlider", valueToAdd: text }));
        setText(option.min.toString())
        setSliderValue(option.min)
    }

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value)
        setText(event.target.value)
    }

    return (
        <div className={finalClassNames}>
            <form onSubmit={handleSubmit}>
                <label className={p2Class}>Insert end year</label>
                <input type='number' className={finalClassNames} value={text} onChange={handleChange} min={option.min} max={option.max} required />
                <div className={p2Class}>
                    <input type="range" min={option.min} max={option.max} value={value}
                        onChange={handleSliderChange}
                    />
                </div>
            </form>
        </div>
    )
}

export default SliderDropdownPanel;
