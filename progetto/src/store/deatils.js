import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
    name: "filters",
    initialState: {
        detail: null
    },
    reducers:{
        setDetailArtwork(state,action){
            return {
                ...state,
                detail: action.payload,
            };
        }
    }
})

export default detailsSlice;