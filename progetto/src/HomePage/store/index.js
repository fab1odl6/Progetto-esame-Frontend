import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import eventsSlice from "./events";
import artDetailSlice from "./artDetails";
import usersSlice from "./user";
import filtersSlice from "../../store/filters";
import searchSlice from "../../store/search";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        events: eventsSlice.reducer,
        artDetails: artDetailSlice.reducer,
        users: usersSlice.reducer,
        filters: filtersSlice.reducer,
        search: searchSlice.reducer

    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;
export const { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } = eventsSlice.actions;
export const { setArt } = artDetailSlice.actions;
export const { registerUser, setUser, setLogged, updateArt, updateEvent } = usersSlice.actions;
export const { removeFilterItem, addFilterItem } = filtersSlice.actions;
export const { updateText, clearText } = searchSlice.actions;
