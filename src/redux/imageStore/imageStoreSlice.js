import { createSlice } from "@reduxjs/toolkit";

const imageStoreSlice = createSlice({
    name: "image",
    initialState: {
        image: [],
    },
    reducers: {
        setImage(state, action) {
            const image = action.payload;
            state.image = image;
        },
    },
});
export const { setImage } = imageStoreSlice.actions;

export default imageStoreSlice.reducer;
