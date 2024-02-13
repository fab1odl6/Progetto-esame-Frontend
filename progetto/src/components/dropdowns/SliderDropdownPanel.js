import { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addFilterItem } from "../../store";

function SliderDropdownPanel({ options, className }) {
  const containterClassNames = classNames(
    "border-1 border-blue-500 rounded p-2 shadow bg-white w-full",
    className
  );
  const inputClassNames = classNames(
    "border border-blue-500 rounded p-2 shadow bg-white w-full",
    className
  );
  const p2Class = "p-2";

  const [text, setText] = useState(options.min.toString());
  const [value, setSliderValue] = useState(options.min);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setText(event.target.value);
    if (event.target.value == "") {
      setSliderValue(options.min);
    } else {
      setSliderValue(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addFilterItem({ filterName: "filterSlider", valueToAdd: text }));
    setText(options.min.toString());
    setSliderValue(options.min);
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    setText(event.target.value);
  };

  return (
    <div className={containterClassNames}>
      <form onSubmit={handleSubmit}>
        <label className={p2Class}>Insert end year</label>
        <input
          type="number"
          className={inputClassNames}
          value={text}
          onChange={handleChange}
          min={options.min}
          max={options.max}
          required
        />
        <div className={p2Class}>
          <input
            type="range"
            min={options.min}
            max={options.max}
            value={value}
            onChange={handleSliderChange}
          />
        </div>
      </form>
    </div>
  );
}

export default SliderDropdownPanel;
