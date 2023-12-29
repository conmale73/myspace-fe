import { createSlice } from "@reduxjs/toolkit";

const groupDetailSlice = createSlice({
    name: "groupDetail",
    initialState: {
        data: null,
    },
    reducers: {
        setGroupDetail(state, action) {
            const data = action.payload;
            state.data = data;
        },
    },
});
export const { setGroupDetail } = groupDetailSlice.actions;

export default groupDetailSlice.reducer;
