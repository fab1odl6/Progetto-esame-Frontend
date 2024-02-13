import { useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addFilterItem, removeFilterItem } from "../../store";

function CheckboxDropdownPanel({ className, options }) {
  const labelClass =
    "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer p-1 w-full border-b border-blue-200";
  const inputClass = "mr-2 cursor-pointer";

  const [checkedItems, setCheckedItems] = useState({});
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filters.filterCheckbox);
  const finalClassNames = classNames(
    "border-1 border-blue-500 rounded p-3 shadow bg-white w-full",
    className
  );

  useEffect(() => {
    const initialState = filterState.reduce((acc, value) => {
      acc[value] = true;
      return acc;
    }, {});
    setCheckedItems(initialState);
  }, [filterState]);

  const handleCheckboxChange = (option) => {
    const newCheckedItems = {
      ...checkedItems,
      [option.value]: !checkedItems[option.value],
    };
    setCheckedItems(newCheckedItems);
    dispatch(
      addFilterItem({ filterName: "filterCheckbox", valueToAdd: option.value })
    );
  };

  const handleCheckboxRemoval = (option) => {
    const newCheckedItems = {
      ...checkedItems,
      [option.value]: !checkedItems[option.value],
    };
    setCheckedItems(newCheckedItems);
    dispatch(
      removeFilterItem({
        filterName: "filterCheckbox",
        valueToRemove: option.value,
      })
    );
  };

  return (
    <div className={finalClassNames}>
      {options.map((option) => (
        <div key={option.value}>
          <label className={labelClass} key={option.value}>
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
              className={inputClass}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxDropdownPanel;
