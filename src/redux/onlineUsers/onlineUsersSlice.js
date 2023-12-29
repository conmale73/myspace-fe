import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
    name: "onlineUsers",
    initialState: {
        data: [],
    },
    reducers: {
        getOnlineUsers(state, action) {
            state.data = action.payload;
        },
        setOnlineUsers(state, action) {
            state.data = action.payload;
        },
    },
});

export const { getOnlineUsers, setOnlineUsers, logout } =
    onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
