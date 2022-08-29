import { createSlice } from "@reduxjs/toolkit";

export const renderSlice = createSlice({
    name: "render",
    initialState: {
        render: "main",
    },
    reducers: {
        changeRender: (state, action) => {
            state.render = action.payload;
        },
    },
});

export default renderSlice.reducer;

export const { changeRender } = renderSlice.actions;
