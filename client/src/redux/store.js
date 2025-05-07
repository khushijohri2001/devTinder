import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import profileReducer from "./profileSlice.js";
import connectionsReducer from './connectionsSlice.js';
import pendingRequestsReducer from './pendingRequestsSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        profile: profileReducer,
        connections: connectionsReducer,
        pendingRequests: pendingRequestsReducer
    }
})

export default store;