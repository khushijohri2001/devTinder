import { createSlice } from "@reduxjs/toolkit";

export const pendingRequestsSlice = createSlice({
  name: "pendingRequests",
  initialState: null,
  reducers: {
    addPendingRequest: (state, action) => {
      return action.payload;
    },
    removePendingRequest: (state, action) => {
       return state.filter((user) => user._id !== action.payload)
    }
  },
});

export const { addPendingRequest, removePendingRequest } = pendingRequestsSlice.actions;
export default pendingRequestsSlice.reducer;
