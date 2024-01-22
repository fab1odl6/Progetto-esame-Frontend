import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
    name: "activePage",
    initialState: {
        page: ""
    },
    reducers: {
        setPage(state, action) {
            return ({
                ...state,
                page: action.payload
            })
        }
    }
})

export default activePageSlice;