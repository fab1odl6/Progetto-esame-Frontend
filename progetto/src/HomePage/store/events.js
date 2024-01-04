import { createSlice } from "@reduxjs/toolkit";

let eventArray = [
    {
        name: "evento 1",
        favorite: false,
        full: false
    },
    {
        name: "evento 2",
        favorite: false,
        full: false
    },
    {
        name: "evento 3",
        favorite: false,
        full: false
    },
    {
        name: "evento 4",
        favorite: false,
        full: false
    },
    {
        name: "evento 5",
        favorite: false,
        full: false
    }
];



const eventsSlice = createSlice({
    name: "events",
    initialState: {
        array: eventArray,
        index: 0,
        favorite: false,
        full: false
    },
    reducers: {
        swipeRightEvent(state, action) {
            const newIndex = (state.index + 1) % state.array.length;
            return { ...state, index: newIndex };
        },

        swipeLeftEvent(state, action) {
            const newIndex = (state.index - 1 + state.array.length) % state.array.length;
            return { ...state, index: newIndex };
        },

        switchFavoriteEvent(state, action) {
            const newFavorite = !state.array[state.index].favorite;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], favorite: newFavorite };

            return { ...state, array: newArray, favorite: newFavorite };
        },

        switchFullEvent(state, action) {
            console.log("a")
            const newFull = !state.array[state.index].full;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], full: newFull };

            return { ...state, array: newArray, full: newFull };
        },
    },
});

export default eventsSlice;