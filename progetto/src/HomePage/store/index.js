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

let eventArray = [
    {
        name: "evento 1",
        favorite: false
    },
    {
        name: "evento 2",
        favorite: false
    },
    {
        name: "evento 3",
        favorite: false
    },
    {
        name: "evento 4",
        favorite: false
    },
    {
        name: "evento 5",
        favorite: false
    }
];

const artworksSlice = createSlice({
    name: "artworks",
    initialState: {
        array: artArray,
        index: 0
    },
    reducers: {
        swipeRightArt(state, action) {
            return state.array[state.index + 1 + state.array.length] % state.array.length;
        },

        swipeLeftArt(state, action) {

        },

        switchFavoriteArt(state, action) {

        }
    },
});

const eventsSlice = createSlice({
    name: "events",
    initialState: eventArray,
    reducers: {
        swipeRightEvent(state, action) {

        },

        swipeLeftEvent(state, action) {

        },

        switchFavoriteEvent(state, action) {

        }
    },
});

const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        events: eventsSlice.reducer
    }
});


export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt } = artworksSlice.actions;
export const { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent } = eventsSlice.actions; 
