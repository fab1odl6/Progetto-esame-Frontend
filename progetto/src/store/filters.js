import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filterInput: [],
        filterSelection: [],
        filterSlider: [],
        filterCheckbox: [],
    },
    reducers:{

        //INSERIMENTO GENERICO
        addFilterItem(state, action){
            const { filterName, valueToAdd } = action.payload;
            if (state[filterName] && !state[filterName].includes(valueToAdd)) {
              return {
                ...state,
                [filterName]: [...state[filterName], valueToAdd]
              };
            }
            // Se il filtro specificato non esiste, restituisci lo stato inalterato
            return state;
        },

        //GENERICA RIMOZIONE
        removeFilterItem (state, action) {
            const { filterName, valueToRemove } = action.payload;
          
            if (state[filterName]) {
              return {
                ...state,
                [filterName]: state[filterName].filter(item => item !== valueToRemove)
              };
            }
            // Se il filtro specificato non esiste, restituisci lo stato inalterato
            return state;
        }

    }
})

export default filtersSlice;