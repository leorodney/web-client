// setupe the authSlice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../interfaces/user";

// define the initial state
const initialState : AuthUser = {
    isAuthenticated: false,
    name: "",
    email: "",
    username: "",
    uid: "",
    profilePicture: "",
    joined: new Date().toDateString(),
};

// create the slice
const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // define the reducers
        login: (state, action: PayloadAction<AuthUser>) => {
            state.isAuthenticated = true;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.profilePicture = action.payload.profilePicture;
            state.joined = action.payload.joined;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.name = "";
            state.username = "";
            state.uid = "";
            state.email = "";
            state.profilePicture = "";
            state.joined = new Date().toDateString();
        }
    }
});

// export the actions and reducer
export const { login, logout } = authReducer.actions;
export default authReducer.reducer;