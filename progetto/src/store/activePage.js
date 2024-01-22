import { createSlice } from "@reduxjs/toolkit";


const activePageSlice = createSlice({
    name: "activePageSlice",
    initialState: {
        page: "HomePage"
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
