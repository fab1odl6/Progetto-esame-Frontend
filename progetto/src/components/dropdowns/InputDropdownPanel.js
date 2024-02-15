import { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addFilterItem } from "../../store";

function InputDropdownPanel({ className, options }) {
  const containterClassNames = classNames(
    "border-1 border-blue-500 rounded p-2 shadow bg-white w-full",
    className
  );
  const inputClassNames = classNames(
    "border border-blue-500 rounded p-2 w-full",
    className
  );
  const labelClass = "p-2";
  const matchedPanelClass = "matched-panel mt-1";
  const valueClass = classNames(
    "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
    inputClassNames
  );

  const [text, setText] = useState("");
  const [matchedValues, setMatchedValues] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const inputValue = event.target?.value;
    setText(inputValue);

    const matches = options.filter((value) =>
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
    setMatchedValues(matches);
  };

  const handleSelect = (selectedValue) => {
    dispatch(addFilterItem({ filterName: "filterInput", valueToAdd: selectedValue }));
    setText("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addFilterItem({ filterName: "filterInput", valueToAdd: text }));
    setText("");
  };

  return (
    <div className={containterClassNames}>
      <form onSubmit={handleSubmit}>
        <label className={labelClass}>Insert author name</label>
        <input
          className={inputClassNames}
          value={text}
          onChange={handleChange}
        />
        {text && matchedValues.length > 0 && (
          <div className={matchedPanelClass}>
            {matchedValues.slice(0, 3).map((value, index) => (
              <div
                className={valueClass}
                key={index}
                onClick={() => handleSelect(value)}
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default InputDropdownPanel;
