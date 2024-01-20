import { createSlice } from "@reduxjs/toolkit";


const artDetailSlice = createSlice({
    name: "artDetailSlice",
    initialState: {
        art: {},
        favoriteState: false
    },
    reducers: {
        setArt(state, action) {

            return {
                ...state,
                art: action.payload,
            };
        },
        setFavorite(state, action) {
            return ({
                ...state,
                favoriteState: action.payload
            })
        }
    },
});

export default artDetailSlice;
