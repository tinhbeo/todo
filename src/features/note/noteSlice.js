import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: [
    {
      id: uuidv4(),
      title: "react js",
      details: "react js details",
      time: new Date().toISOString(),
    },
  ],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, value) => {
      state.data.push(value.payload);
    },
    deleteNote: (state, value) => {
      const newData = state.data.filter((note) => note.id !== value.payload);
      console.log(newData);
      return {
        data: state.data.filter((note) => note.id !== value.payload),
      };
    },
  },
});
export const { addNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
