import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../components/FirebaseConfig";
import { getDatabase, set, ref } from "firebase/database";


const updateData = function (user) {
    console.log(user)
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

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
        logged: null
    },
    reducers: {
        setUser(state, action) {
            updateData(action.payload);
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

export default usersSlice;
