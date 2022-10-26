import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Note from "./components/note/Note";
import { addNote, deleteNote } from "./features/note/noteSlice";
import "./App.css";
function App() {
  const data = useSelector((state) => state.noteReducer.data);
  const [value, setValue] = useState({
    title: "",
    details: "",
  });

  const dispatch = useDispatch();

  const handleChangeTitle = (e) => {
    setValue({
      ...value,
      title: e.target.value,
    });
  };

  const handleChangeDetails = (e) => {
    setValue({
      ...value,
      details: e.target.value,
    });
  };

  const handleAddNote = async () => {
    const date = new Date().toISOString();
    dispatch(addNote({ ...value, time: date, id: uuidv4() }));
    setValue({
      title: "",
      details: "",
    });
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Timestamped Notes app</h2>
        <input
          type="text"
          id="myInput"
          placeholder="Note Title"
          value={value.title}
          onChange={handleChangeTitle}
        />

        <input
          type="text"
          id="myInput"
          placeholder="Note Details"
          value={value.details}
          onChange={handleChangeDetails}
        />
        <button className="addBtn" onClick={handleAddNote}>
          Add Note
        </button>
      </div>

      <ul>
        {data &&
          data.map((item, index) => (
            <Note key={index} note={item} handleDeleteNote={handleDeleteNote} />
          ))}
      </ul>
    </div>
  );
}

export default App;
