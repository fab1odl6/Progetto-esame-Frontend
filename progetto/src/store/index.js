import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import usersSlice from "./user";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        users: usersSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt, setArtworks } = artworksSlice.actions;
export const { setUser, setLogged } = usersSlice.actions;
