import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profile",
    initialState: {
        isProfilePreview: false,
        profileData: null
    },
    reducers: {
        profilePreviewToggle: (state, action) => {
            state.isProfilePreview = !state.isProfilePreview
        },
        updateProfile: (state, action) => {
            state.profileData = {...state.profileData, ...action.payload}
        }
    }
})

export const {profilePreviewToggle, updateProfile} = profileSlice.actions;
export default profileSlice.reducer;

