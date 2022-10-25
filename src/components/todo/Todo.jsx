import React from "react";

const Todo = (props) => {
  const { todo, handleDeleteTodo, handleChose } = props;
  return (
    <div style={{ display: "flex" }}>
      <li onClick={() => handleChose(todo)}>{todo.name}</li>
      <span
        onClick={() => handleDeleteTodo(todo.id)}
        style={{ marginLeft: "10px" }}
      >
        X
      </span>
    </div>
  );
};

export default Todo;
