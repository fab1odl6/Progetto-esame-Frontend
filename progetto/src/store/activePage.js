import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
  name: "activePageSlice",
  initialState: {
    page: "HomePage",
    previousPage: "/",
  },
  reducers: {
    setPage(state, action) {
      return {
        ...state,
        page: action.payload,
      };
    },
    setPreviousPage(state, action) {
      return {
        ...state,
        previousPage: action.payload,
      };
    },
  },
});

export default activePageSlice;
