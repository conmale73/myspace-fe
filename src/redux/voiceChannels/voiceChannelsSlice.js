import { createSlice } from "@reduxjs/toolkit";

const voiceChannelsSlice = createSlice({
    name: "voiceChannels",
    initialState: {
        data: [],
    },
    reducers: {
        setVoiceChannels(state, action) {
            state.data = action.payload;
        },
        removeUserFromVoiceChannel(state, action) {
            const voiceChannel = action.payload;
            voiceChannel.currentMembers = voiceChannel.currentMembers.filter(
                (e) => e !== userID
            );
        },
    },
});
export const { setVoiceChannels, removeUserFromVoiceChannel } =
    voiceChannelsSlice.actions;

export default voiceChannelsSlice.reducer;
