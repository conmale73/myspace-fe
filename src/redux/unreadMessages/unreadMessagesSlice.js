import { createSlice } from "@reduxjs/toolkit";

const unreadMessagesSlice = createSlice({
    name: "unreadMessages",
    initialState: {
        count: 0,
        hightlightChats: [],
    },
    reducers: {
        setCount(state, action) {
            state.count = action.payload;
        },
        setHightlightChats(state, action) {
            state.hightlightChats = action.payload;
        },
    },
});
export const { setCount, setHightlightChats } = unreadMessagesSlice.actions;

export default unreadMessagesSlice.reducer;
