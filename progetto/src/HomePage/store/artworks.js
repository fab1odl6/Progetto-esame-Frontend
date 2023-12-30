import { configureStore, createSlice } from "@reduxjs/toolkit";

let artArray = [
    {
        id: 1,
        name: "opera 1",
        favorite: false
    },
    {
        id: 2,
        name: "opera 2",
        favorite: false
    },
    {
        id: 3,
        name: "opera 3",
        favorite: false
    },
    {
        id: 4,
        name: "opera 4",
        favorite: false
    },
    {
        id: 5,
        name: "opera 5",
        favorite: false
    }
];

const artworksSlice = createSlice({
    name: "artworks",
    initialState: {
        array: artArray,
        index: 0,
        favorite: false
    },
    reducers: {
        swipeRightArt(state, action) {
            const newIndex = (state.index + 1) % state.array.length;
            return { ...state, index: newIndex };
        },

        swipeLeftArt(state, action) {
            const newIndex = (state.index - 1 + state.array.length) % state.array.length;
            return { ...state, index: newIndex };
        },

        switchFavoriteArt(state, action) {
            const newFavorite = !state.array[state.index].favorite;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], favorite: newFavorite };

            return { ...state, array: newArray, favorite: newFavorite };
        },
    },
});

export default artworksSlice;