import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set } from "firebase/database";
import { firebaseConfig } from "..//../components/FirebaseConfig";


let eventArray = [];
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function readData() {
    const artworksRef = child(dbRef, 'events');

    try {
        const snapshot = await get(artworksRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const dataObj = data[key];

                    eventArray.push({
                        id: dataObj.id,
                        name: dataObj.name,
                        image: dataObj.image,
                        date: dataObj.date,
                        place: dataObj.place,
                        guests: dataObj.guests,
                        favorite: false,
                        full: false
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

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        array: eventArray,
        index: 0,
        favorite: false,
        full: false
    },
    reducers: {
        swipeRightEvent(state, action) {
            const newIndex = (state.index + 1) % state.array.length;
            return { ...state, index: newIndex };
        },

        swipeLeftEvent(state, action) {
            const newIndex = (state.index - 1 + state.array.length) % state.array.length;
            return { ...state, index: newIndex };
        },

        switchFavoriteEvent(state, action) {
            const newFavorite = !state.array[state.index].favorite;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], favorite: newFavorite };

            return { ...state, array: newArray, favorite: newFavorite };
        },

        switchFullEvent(state, action) {
            console.log("a")
            const newFull = !state.array[state.index].full;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], full: newFull };

            return { ...state, array: newArray, full: newFull };
        },
    },
});

export default eventsSlice;
