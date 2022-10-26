import React from "react";
import { useState } from "react";

const Note = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { note, handleDeleteNote, handleOpenDetails } = props;
  return (
    <div>
      <div>
        <h1>{note.title}</h1>
        <div>
          <p>{note.time}</p>
          <div>
            <span onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "hide details" : "show details"}
            </span>
            <span onClick={() => handleDeleteNote(note.id)}>remove note</span>
          </div>
        </div>
      </div>
      {isOpen && <p>{note.details}</p>}
    </div>
  );
};

export default Note;
