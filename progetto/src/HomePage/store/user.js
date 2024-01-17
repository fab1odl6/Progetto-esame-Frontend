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


const usersSlice = createSlice({
    name: "usersSlice",
    initialState: {
        user: {},
        logged: false,
        artworks: [],
        events: []
    },
    reducers: {
        setUser(state, action) {
            updateData(action.payload.matchedUser);
            return ({
                ...state,
                user: action.payload.matchedUser,
                artworks: action.payload.artworks,
                events: action.payload.events
            });
        },
        setLogged(state, action) {
            return ({
                ...state,
                logged: !state.logged
            });
        },
        updateArt(state, action) {
            if (!state.artworks.find((item) => item.id === action.payload.id)) {
                return ({
                    ...state,
                    artworks: state.artworks.concat([action.payload])
                });
            } else {
                return ({
                    ...state,
                    artworks: state.artworks.filter(artwork => artwork !== action.payload)
                });
            }
        },

        updateEvent(state, action) {
            if (!state.events.includes(action.payload)) {
                return ({
                    ...state,
                    events: state.events.concat([action.payload])
                });
            } else {
                return ({
                    ...state,
                    events: state.events.pop(action.payload)
                });
            }
        }
    }
});

export default usersSlice;
