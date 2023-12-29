import { createSlice } from "@reduxjs/toolkit";

const editingImageSlice = createSlice({
    name: "editingImage",
    initialState: {
        index: null,
        dataURL: null,
    },
    reducers: {
        setIndex(state, action) {
            const index = action.payload;
            state.index = index;
        },
        setEditingImage(state, action) {
            const data = action.payload;
            state.dataURL = data;
        },
    },
});
export const { setSelectedImages, setIndex, setEditingImage } =
    editingImageSlice.actions;

export default editingImageSlice.reducer;
