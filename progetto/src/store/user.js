import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set, remove } from "firebase/database";
import { firebaseConfig } from "../components/FirebaseConfig";


const userSlice = createSlice({
    name: "users",
    initialState: {
        user: {},
        logged: null
    },
    reducers: {
        setUser(state, action) {
            return ({
                ...state,
                user: action.payload
            })
        },
        setLogged(state, action) {
            return ({
                ...state,
                logged: !state.logged
            })
        }
    },
});

export default userSlice;
