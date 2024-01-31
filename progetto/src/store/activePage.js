import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
  name: "activePageSlice",
  initialState: {
    page: "HomePage",
    previousPage: "/",
    everyArtworkPage: 1,
    personalGalleryPage: 1,
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
    setEveryArtworkPage(state,action){
      return {
        ...state,
        everyArtworkPage: action.payload
      }
    },
    setPersonalGalleryPage(state,action){
      return {
        ...state,
        personalGalleryPage: action.payload
      }
    }
  },
});

export default activePageSlice;
