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

const eventArray = Array();
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
    set(ref(db, "users/" + user.name + "/events/" + event.name), {
      id: event.id,
      name: event.name,
      image: event.image,
      date: event.date,
      department: event.department,
      guests: event.guests,
      favorite: true,
      full: false,
    });

    update(ref(db, "events/" + event.name), {
      favorite: true,
    });
  } else {
    remove(ref(db, "users/" + user.name + "/events/" + event.name));

    update(ref(db, "events/" + event.name), {
      favorite: false,
    });
  }
}

function updateEvents(event) {
  const db = getDatabase();

  set(ref(db, "events/" + event.name), {
    id: event.id,
    name: event.name,
    image: event.image,
    date: event.date,
    department: event.department,
    guests: event.guests,
    favorite: false,
    full: false,
  });
}

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    array: eventArray,
    index: 0,
    favorite: false,
    full: false,
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
  },
});

export default eventsSlice;
