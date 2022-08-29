import { createSlice } from "@reduxjs/toolkit";

function initialNotes() {
    const retrievedObject = localStorage.getItem("storedNotes");
    if (retrievedObject) return JSON.parse(retrievedObject);
    else return initialNote;
}

const initialNote = [
    {
        title: "Initial Task",
        color: "#efaefa",
        priority: "high",
        content:
            "Hello there, welcome to GetItDone. Click on this note to open. With this app you can set up tasks in notes, then when you open a task you can start pomdoro timmers until complete it. Once you are done with a task you can simply delete it from the options button  next to the title note. You can setup background music from youtube videos on the app settings. To create a new task simple press 'ADD NEW TASK', you can setup its color and priority. Tasks with higher priority will be shown first. Delete this note when you are ready, and start adding your own!",
    },
];

const initialState = {
    notes: initialNotes(),
    current: "",
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        updateNotes: (state, action) => {
            state.notes = action.payload;
        },
        currentNote: (state, action) => {
            state.current = action.payload;
        },
    },
});

export default notesSlice.reducer;

export const { updateNotes, currentNote } = notesSlice.actions;
