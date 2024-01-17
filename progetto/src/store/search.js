import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        text: "",
    },
    reducers:{

        updateText: (state, action) => {
            console.log("OK")
            state.text = action.payload; // Aggiorna lo stato con il nuovo valore
        },

        clearText: (state) => {
            state.text = ""; // Resetta lo stato alla stringa vuota
        },
    }
})

export default searchSlice;