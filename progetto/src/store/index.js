import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import usersSlice from "./user";
import filtersSlice from "./filters";
import artDetailSlice from "./artDetails";
import searchSlice from "./search";
import eventsSlice from "./events";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        users: usersSlice.reducer,
        filters: filtersSlice.reducer,
        artDetails: artDetailSlice.reducer,
        search: searchSlice.reducer,
        events: eventsSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;
export const { registerUser, setUser, setLogged, updateArt, updateEvent, updateCustomEvents, logoutUser, setArtworks, setEvents } = usersSlice.actions;
export const { setArt, setFavorite } = artDetailSlice.actions;
export const { addFilterItem, removeFilterItem } = filtersSlice.actions;
export const { updateText, clearText } = searchSlice.actions;
export const { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } = eventsSlice.actions;
