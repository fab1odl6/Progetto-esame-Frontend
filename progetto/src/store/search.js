import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: "",
  },
  reducers: {
    updateText: (state, action) => {
      state.text = action.payload;
    },

    clearText: (state) => {
      state.text = "";
    },
  },
});

export default searchSlice;
