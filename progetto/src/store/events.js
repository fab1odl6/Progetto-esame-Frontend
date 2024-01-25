import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  remove,
  update,
} from "firebase/database";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";

const eventArray = [];
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function readData() {
  const artworksRef = child(dbRef, "events");

  try {
    const snapshot = await get(artworksRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const event = data[key];

          eventArray.push({
            id: event.id,
            name: event.name,
            image: event.image,
            date: event.date,
            department: event.department,
            guests: event.guests,
            favorite: event.favorite,
            full: event.full,
            path: event.path,
          });
        }
      }
    } else {
      console.log("No data available");
    }
  } catch (e) {
    console.error(e);
  }
}

await readData();

function updateFavorite(event, user) {
  const db = getDatabase();

  if (!event.favorite) {
    set(ref(db, "users/" + user.name + "/events/" + event.path), {
      id: event.id,
      name: event.name,
      image: event.image,
      date: event.date,
      department: event.department,
      guests: event.guests,
      favorite: true,
      full: false,
      path: event.path,
    });

    update(ref(db, "events/" + event.path), {
      favorite: true,
    });
  } else {
    remove(ref(db, "users/" + user.name + "/events/" + event.path));

    update(ref(db, "events/" + event.path), {
      favorite: false,
    });
  }
}

function updateEvents(event) {
  const db = getDatabase();

  set(ref(db, "events/" + event.path), {
    id: event.id,
    name: event.name,
    image: event.image,
    date: event.date,
    department: event.department,
    guests: event.guests,
    favorite: false,
    full: false,
    path: event.path,
  });
}

const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState: {
    array: eventArray,
    index: 0,
    favorite: false,
    full: false,
    path: "",
  },
  reducers: {
    swipeRightEvent(state, action) {
      const newIndex = (state.index + 1) % state.array.length;
      return { ...state, index: newIndex };
    },

    swipeLeftEvent(state, action) {
      const newIndex =
        (state.index - 1 + state.array.length) % state.array.length;
      return { ...state, index: newIndex };
    },

    switchFavoriteEvent(state, action) {
      const newFavorite = !state.array[state.index].favorite;
      const newArray = [...state.array];
      newArray[state.index] = {
        ...newArray[state.index],
        favorite: newFavorite,
      };

      updateFavorite(action.payload.event, action.payload.user);
      return { ...state, array: newArray, favorite: newFavorite };
    },

    switchFullEvent(state, action) {
      const newFull = !state.array[state.index].full;
      const newArray = [...state.array];
      newArray[state.index] = { ...newArray[state.index], full: newFull };

      return { ...state, array: newArray, full: newFull };
    },

    addNewEvent(state, action) {
      updateEvents(action.payload);
      const newArray = [...state.array, action.payload];

      return {
        ...state,
        array: newArray,
      };
    },

    removeEvent(state, action) {
      const db = getDatabase();
      const newArray = state.array.slice(0, action.payload);
      remove(ref(db, "events/" + action.payload.path));

      return {
        ...state,
        array: newArray,
      };
    },
  },
});

export default eventsSlice;
