import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import eventsSlice from "./events";
import artDetailSlice from "./artDetails";
import usersSlice from "./user";
import filtersSlice from "../../store/filters";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        events: eventsSlice.reducer,
        artDetails: artDetailSlice.reducer,
        users: usersSlice.reducer,
        filters: filtersSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;
export const { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } = eventsSlice.actions;
export const { setArt, onClickHeart } = artDetailSlice.actions;
export const { setUser, setLogged, updateArt, updateEvent } = usersSlice.actions;
export const { removeFilterItem, addFilterItem } = filtersSlice.actions;


