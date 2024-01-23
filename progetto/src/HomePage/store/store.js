// store.js
import { createStore } from 'redux';

// Azioni
export const ADD_FAVORITE_EVENT = 'ADD_FAVORITE_EVENT';
export const REMOVE_FAVORITE_EVENT = 'REMOVE_FAVORITE_EVENT';

// Azioni Creators
export const addFavoriteEvent = (event) => ({
  type: ADD_FAVORITE_EVENT,
  payload: event,
});

export const removeFavoriteEvent = (eventId) => ({
  type: REMOVE_FAVORITE_EVENT,
  payload: eventId,
});

// Reducer
const initialState = {
  favoriteEvents: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_EVENT:
      return {
        ...state,
        favoriteEvents: [...state.favoriteEvents, action.payload],
      };

    case REMOVE_FAVORITE_EVENT:
      return {
        ...state,
        favoriteEvents: state.favoriteEvents.filter((event) => event.id !== action.payload),
      };

    default:
      return state;
  }
};

// Store
const store = createStore(rootReducer);

export default store;
