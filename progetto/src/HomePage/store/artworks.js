import { configureStore, createSlice } from "@reduxjs/toolkit";


let artArray = [
    {
        id: 1,
        link: "",
        name: "opera 1",
        image: "image 1",
        favorite: false,
        full: false
    },
    {
        id: 2,
        link: "",
        name: "opera 2",
        image: "image 2",
        favorite: false,
        full: false
    },
    {
        id: 3,
        link: "",
        name: "opera 3",
        image: "image 3",
        favorite: false,
        full: false
    },
    {
        id: 4,
        link: "",
        name: "opera 4",
        image: "image 4",
        favorite: false,
        full: false
    },
    {
        id: 5,
        link: "",
        name: "opera 5",
        image: "image 5",
        favorite: false,
        full: false
    }
];

const artworksSlice = createSlice({
    name: "artworks",
    initialState: {
        array: artArray,
        index: 0,
        favorite: false,
        full: false
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

        switchFullArt(state, action) {
            const newFull = !state.array[state.index].full;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], full: newFull };

            return { ...state, array: newArray, full: newFull };
        },
    },
});

export default artworksSlice;