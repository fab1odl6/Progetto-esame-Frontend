import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set, remove } from "firebase/database";
import { firebaseConfig } from "..//../components/FirebaseConfig";


let eventArray = [];
const dbRef = ref(getDatabase());

async function readData() {
    const artworksRef = child(dbRef, 'users/Fabio/events');

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
                        department: dataObj.department,
                        guests: dataObj.guests,
                        favorite: true,
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

function updateFavorite(event) {
    const db = getDatabase();

    if (!event.favorite) {
        set(ref(db, 'users/Fabio/events/' + event.name), {
            id: event.id,
            name: event.name,
            image: event.image,
            date: event.date,
            department: event.department,
            guests: event.guests,
            favorite: true,
            full: false
        })
    } else {
        remove(ref(db, "users/Fabio/events/" + event.name));
    }
}

const favoriteEventsSlice = createSlice({
    name: "events",
    initialState: {
        array: eventArray,
        index: 0,
        favorite: true,
        full: false
    },
    reducers: {
        switchFavoriteSavedEvent(state, action) {
            const newFavorite = !state.array[state.index].favorite;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], favorite: newFavorite };

            updateFavorite(action.payload);
            return { ...state, array: newArray, favorite: newFavorite };
        },

        switchFullSavedEvent(state, action) {
            const newFull = !state.array[state.index].full;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], full: newFull };

            return { ...state, array: newArray, full: newFull };
        },
    },
});

export default favoriteEventsSlice;
