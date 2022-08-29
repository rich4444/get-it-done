import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice.js";
import renderReducer from "./slices/renderSlice.js";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        render: renderReducer,
    },
});
