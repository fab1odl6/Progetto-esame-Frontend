import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;