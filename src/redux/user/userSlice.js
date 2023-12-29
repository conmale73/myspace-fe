import { createSlice } from "@reduxjs/toolkit";

let user =
    localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user"))
        : null;

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: user,
    },
    reducers: {
        getUser(state, action) {
            state.data = action.payload;
        },
        setUser(state, action) {
            state.data = action.payload;
        },
        logout(state) {
            state.data = null;
        },
    },
});
export const { getUser, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
