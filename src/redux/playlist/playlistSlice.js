import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: "playlists",
    initialState: {
        data: [],
    },
    reducers: {
        getPlaylists(state, action) {
            state.data = action.payload;
        },
        setPlaylists(state, action) {
            state.data = action.payload;
        },
        addPlaylist(state, action) {
            const newPlaylist = action.payload;
            const othersPlaylist = state.data.filter(
                (playlist) => playlist._id !== newPlaylist._id
            );

            state.data = [newPlaylist, ...othersPlaylist];
        },
    },
});

export const { getPlaylists, setPlaylists, addPlaylist } =
    playlistSlice.actions;

export default playlistSlice.reducer;
