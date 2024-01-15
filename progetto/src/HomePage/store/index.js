import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import eventsSlice from "./events";
import artDetailSlice from "./artDetails";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        events: eventsSlice.reducer,
        artDetails: artDetailSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;
export const { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } = eventsSlice.actions;
export const { setArt, onClickHeart } = artDetailSlice.actions;

