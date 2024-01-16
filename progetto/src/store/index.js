import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import userSlice from "./user";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        users: userSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;
export const { setUser, setLogged } = userSlice.actions;
