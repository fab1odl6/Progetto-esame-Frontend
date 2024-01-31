import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filterInput: [],
    filterSelection: [],
    filterSlider: [],
    filterCheckbox: [],
  },
  reducers: {
    addFilterItem(state, action) {
      const { filterName, valueToAdd } = action.payload;
      if (state[filterName] && !state[filterName].includes(valueToAdd)) {
        return {
          ...state,
          [filterName]: [...state[filterName], valueToAdd],
        };
      }
      return state;
    },

    removeFilterItem(state, action) {
      const { filterName, valueToRemove } = action.payload;

      if (state[filterName]) {
        return {
          ...state,
          [filterName]: state[filterName].filter(
            (item) => item !== valueToRemove
          ),
        };
      }

      return state;
    },
  },
});

export default filtersSlice;
