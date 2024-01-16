import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../components/FirebaseConfig";
import { getDatabase, set, ref, child, get } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

const updateData = function (user) {
    set(ref(db, "/users/" + user.name + "/personalData"), {
        name: user.name,
        surname: user.surname,
        password: user.password,
        username: user.username
    })
}


async function getArt(user) {
    const artArray = [];
    const artRef = child(dbRef, "/users/" + user.name + "/artworks");

    try {
        const snapshot = await get(artRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
                const dataObj = data[key];
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
    } catch (e) {
        console.error(e);
    }
    console.log(artArray)
    return artArray;
}


const usersSlice = createSlice({
    name: "usersSlice",
    initialState: {
        user: {},
        logged: null,
        artworks: []
    },
    reducers: {
        setUser(state, action) {
            updateData(action.payload);
            const newArtworks = getArt(action.payload);
            return ({
                ...state,
                artworks: newArtworks,
                user: action.payload
            })
        },
        setLogged(state, action) {
            return ({
                ...state,
                logged: !state.logged
            })
        }
    }
});

export default usersSlice;
