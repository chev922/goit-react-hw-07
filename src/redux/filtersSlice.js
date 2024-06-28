import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "filters",
    initialState: {
        name: "",
    },
    reducers: {
        changeTextFilter(state, action) {
            state.name = action.payload;
        },
    },
});

export const { changeTextFilter } = slice.actions;

export const selectTextFilter = (state) => state.filters.name;

export default slice.reducer;