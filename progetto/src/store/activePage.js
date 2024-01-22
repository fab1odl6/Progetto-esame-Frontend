import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
    name: "activePage",
    initialState: {
        page: "HomePage"
    },
    reducers: {
        setPage(state, action) {
            console.log("Page in store: " + action.payload)
            return ({
                ...state,
                page: action.payload
            })
        }
    }
})

export default activePageSlice;
