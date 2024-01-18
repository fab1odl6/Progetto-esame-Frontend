import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/FirebaseConfig";
import { getDatabase, set, ref } from "firebase/database";


const updateData = function (user) {
    console.log("user: " + user)
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    set(ref(db, "/users/" + user.name), {
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
        logged: false
    },
    reducers: {
        setUser(state, action) {
            updateData(action.payload);
            return ({
                ...state,
                user: action.payload,
                logged: true
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

export const { setUser, setLogged } = usersSlice.actions;
export default usersSlice;
