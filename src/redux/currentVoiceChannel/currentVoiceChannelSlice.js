import { createSlice } from "@reduxjs/toolkit";

const currentVoiceChannelSlice = createSlice({
    name: "currentVoiceChannel",
    initialState: {
        data: null,
    },
    reducers: {
        setCurrentVoiceChannel(state, action) {
            state.data = action.payload;
        },
    },
});
export const { setCurrentVoiceChannel } = currentVoiceChannelSlice.actions;

export default currentVoiceChannelSlice.reducer;
