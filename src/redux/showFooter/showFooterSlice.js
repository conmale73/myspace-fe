import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: localStorage.getItem("showFooter") || true,
};

const showFooterSlice = createSlice({
    name: "showFooter",
    initialState,
    reducers: {
        setShowFooter(state, action) {
            const show = action.payload;
            state.show = show;
            localStorage.setItem("showFooter", show);
        },
    },
});
export const { setShowFooter } = showFooterSlice.actions;

export default showFooterSlice.reducer;
