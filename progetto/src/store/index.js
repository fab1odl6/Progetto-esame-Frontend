import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import artworksSlice from "./artworks";
import usersSlice from "./user";
import filtersSlice from "./filters";
import artDetailSlice from "./artDetails";
import searchSlice from "./search";
import eventsSlice from "./events";
import activePageSlice from "./activePage";

const rootReducer = combineReducers({
  artworks: artworksSlice.reducer,
  users: usersSlice.reducer,
  filters: filtersSlice.reducer,
  artDetails: artDetailSlice.reducer,
  search: searchSlice.reducer,
  events: eventsSlice.reducer,
  activePage: activePageSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export const { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } = artworksSlice.actions;
export const { registerUser, setUser, setLogged, updateArt, updateEvent, updateCustomEvents, logoutUser, setArtworks, setEvents } = usersSlice.actions;
export const { setArt, setFavorite } = artDetailSlice.actions;
export const { addFilterItem, removeFilterItem } = filtersSlice.actions;
export const { updateText, clearText } = searchSlice.actions;
export const { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } = eventsSlice.actions;
export const { setPage } = activePageSlice.actions;
