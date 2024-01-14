import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../components/FirebaseConfig";
import { getDatabase, set, ref, remove } from "firebase/database";


function updateFavorite(art) {
    const app = initializeApp(firebaseConfig);
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
            full: false,
            type: art.type
        })
    } else {
        remove(ref(db, "users/Fabio/artworks/" + art.title));
    }
}

const artDetailSlice = createSlice({
    name: "artDetailSlice",
    initialState: {
        art: {}
    },
    reducers: {
        setArt(state, action) {
            return {
                ...state,
                art: action.payload,
            };
        },
        onClickHeart(state, action) {
            const newFavorite = !state.art.favorite;
            const newArt = {
                ...state.art,
                favorite: newFavorite,
            };

            updateFavorite(action.payload);
            return { ...state, art: newArt };
        },
    },
});

export default artDetailSlice;
