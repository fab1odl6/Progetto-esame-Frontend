import { createSlice } from "@reduxjs/toolkit";


const artDetailSlice = createSlice({
    name: "artDetailSlice",
    initialState: {
        art: {}
    },
    reducers: {
        setArt(state, action) {

            return {
                ...state,
                art: action.payload,
            };
        }
    },
});

export default artDetailSlice;
