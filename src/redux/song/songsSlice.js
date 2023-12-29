import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        listSong: {
            data: [],
        },
        songDetail: {
            data: {},
        },
    },
    reducers: {
        getListSong(state, action) {
            state.listSong.data = action.payload;
        },
        getSongDetail(state, action) {
            state.songDetail.data = action.payload;
        },
    },
});
export const { getListSong, getSongDetail } = songsSlice.actions;

export default songsSlice.reducer;
