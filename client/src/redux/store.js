import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import feedReducer from "./feedSlice.js"
import profileReducer from "./profileSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        profile: profileReducer
    }
})

export default store;