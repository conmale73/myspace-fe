import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: JSON.parse(localStorage.getItem("mode")) || "social",
    extend: null,
};

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode(state, action) {
            const mode = action.payload;
            state.mode = mode;
            localStorage.setItem("mode", JSON.stringify(mode));
        },
        setExtend(state, action) {
            const extend = action.payload;
            state.extend = extend;
        },
    },
});
export const { setMode, setExtend } = modeSlice.actions;

export default modeSlice.reducer;
