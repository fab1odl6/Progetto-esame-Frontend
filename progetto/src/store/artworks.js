import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set, remove } from "firebase/database";
import { firebaseConfig } from "../components/FirebaseConfig";

const artArray = [];
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

/*
INSERIRE FUNZIONE PER CARICAMENTO DATI
*/

async function readData() {
    const artworksRef = child(dbRef, 'artworks');

    try {
        const snapshot = await get(artworksRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const dataObj = data[key];
                    if (artArray.length < 5) {
                        artArray.push({
                            id: dataObj.id,
                            link: dataObj.link,
                            authorName: dataObj.authorName,
                            title: dataObj.title,
                            image: dataObj.image,
                            department: dataObj.department,
                            culture: dataObj.culture,
                            period: dataObj.period,
                            date: dataObj.date,
                            dimensions: dataObj.dimensions,
                            city: dataObj.city,
                            state: dataObj.state,
                            country: dataObj.country,
                            classification: dataObj.classification,
                            favorite: dataObj.favorite,
                            full: dataObj.full,
                            type: dataObj.type
                        });
                    }
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

function updateFavorite(art) {
    const db = getDatabase();

    if (!art.favorite) {
        set(ref(db, 'users/Fabio/artworks/' + art.title), {
            id: art.id,
            link: art.link,
            authorName: art.authorName,
            title: art.title,
            image: art.image,
            department: art.department,
            culture: art.culture,
            period: art.period,
            date: art.date,
            dimensions: art.dimensions,
            city: art.city,
            state: art.state,
            country: art.country,
            classification: art.classification,
            favorite: true,
            full: false
        })
    } else {
        remove(ref(db, "users/Fabio/artworks/" + art.title));
    }
}

const artworksSlice = createSlice({
    name: "artworks",
    initialState: {
        array: artArray,
        index: 0,
        favorite: false,
        full: false
    },
    reducers: {
        swipeRightArt(state, action) {
            const newIndex = (state.index + 1) % state.array.length;
            return { ...state, index: newIndex };
        },

        swipeLeftArt(state, action) {
            const newIndex = (state.index - 1 + state.array.length) % state.array.length;
            return { ...state, index: newIndex };
        },

        switchFavoriteArt(state, action) {
            const newFavorite = !state.array[state.index].favorite;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], favorite: newFavorite };

            updateFavorite(action.payload);
            return { ...state, array: newArray, favorite: newFavorite };
        },

        switchFullArt(state, action) {
            const newFull = !state.array[state.index].full;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], full: newFull };

            return { ...state, array: newArray, full: newFull };
        },
        setArtworks(state, action) {
            console.log("Action payload in setArtworks:", action.payload);
            const artworksArray = Array.isArray(action.payload) ? action.payload : [action.payload];
            return { ...state, array: artworksArray };
        },

    },
});

export default artworksSlice;
