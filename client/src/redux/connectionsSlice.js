import { createSlice } from "@reduxjs/toolkit";

export const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return state.filter((user) => user._id !== action.payload)
    }
  },
});

export const { addConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
