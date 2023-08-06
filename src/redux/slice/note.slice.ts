import {createSlice} from "@reduxjs/toolkit";

import {INote} from "../../interfaces";
import {notes} from "../../initialData";

interface IState {
    notes: INote[];
    archived: INote[];
}

const initialState: IState = {
    notes,
    archived: [],
};

const slice = createSlice({
    name: "noteSlice",
    initialState,
    reducers: {
        create: (state, action) => {
            state.notes.push(action.payload);
        },

        edit: (state, action) => {
            const note = action.payload;
            const index = state.notes.findIndex(n => n.id === note.id);

            state.notes.splice(index, 1, note);
        },

        archive: (state, action) => {
            const archiveNote: INote = state.notes.find(n => n.id === action.payload)!;

            state.notes = state.notes.filter(n => n.id !== action.payload);
            state.archived.push(archiveNote);
        },

        unarchive: (state, action) => {
            const unarchiveNote: INote = state.archived.find(n => n.id === action.payload)!;

            state.archived = state.archived.filter(n => n.id !== action.payload);
            state.notes.push(unarchiveNote);
        },

        remove: (state, action) => {
            const index = state.notes.findIndex(n => n.id === action.payload);

            state.notes.splice(index, 1);
        },
    },
});

const {actions, reducer: noteSlice} = slice;

const noteActions = {
    ...actions,
};

export {
    noteActions,
    noteSlice,
};