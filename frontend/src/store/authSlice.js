import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Login action
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        // Logout action
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
