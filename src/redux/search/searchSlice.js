import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainInput: JSON.parse(localStorage.getItem("searchInput")) || "",
    groupInput: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setMainInput(state, action) {
            const input = action.payload;
            state.mainInput = input;
        },
        setGroupInput(state, action) {
            const input = action.payload;
            state.groupInput = input;
        },
    },
});
export const { setMainInput, setGroupInput } = searchSlice.actions;

export default searchSlice.reducer;
