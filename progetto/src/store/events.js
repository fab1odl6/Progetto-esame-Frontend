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
            userGenerated: event.userGenerated,
            generator: event.generator,
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
    userGenerated: event.userGenerated,
    generator: event.generator,
  });
}

const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState: {
    array: eventArray,
    index: 0,
    favorite: false,
    path: "",
  },
  reducers: {
    swipeRightEvent(state, action) {
      const newIndex = state.index + 1;
      if (newIndex === state.array.length) {
        return state;
      }
      return { ...state, index: newIndex };
    },

    swipeLeftEvent(state, action) {
      const newIndex = state.index - 1;
      if (newIndex === -1) {
        return state;
      }
      return { ...state, index: newIndex };
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
      const newArray = state.array.filter(
        (item) => item.name !== action.payload.name
      );
      remove(ref(db, "events/" + action.payload.path));

      return {
        ...state,
        array: newArray,
      };
    },
  },
});

export default eventsSlice;
