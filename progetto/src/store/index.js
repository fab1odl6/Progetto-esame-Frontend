import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./artworks";
import usersSlice from "./user";
import filtersSlice from "./filters";


const store = configureStore({
    reducer: {
        artworks: artworksSlice.reducer,
        users: usersSlice.reducer,
        filters: filtersSlice.reducer
    }
});

export { store };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt, setArtworks } = artworksSlice.actions;
export const { setUser, setLogged } = usersSlice.actions;
