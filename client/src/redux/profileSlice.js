import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profile",
    initialState: {
        isProfilePreview: true,
        profileData: null
    },
    reducers: {
        profilePreviewToggle: (state) => {
            state.isProfilePreview = !state.isProfilePreview
        },
        updateProfile: (state, action) => {
            state.profileData = {...state.profileData, ...action.payload}
        }
    }
})

export const {profilePreviewToggle, updateProfile} = profileSlice.actions;
export default profileSlice.reducer;

