import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        show: false,
        message: "",
        type: "",
    },
    reducers: {
        showToast(state, action) {
            state.show = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideToast(state) {
            state.show = false;
            state.message = "";
            state.type = "";
        },
    },
});
export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
