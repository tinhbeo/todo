import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./components/todo/Todo";
import {
  fetchTodoList,
  addTodoItemAsync,
  editTodoItemAsync,
  deleteTodoItemAsync,
} from "./features/todo/todoSlice";

function App() {
  // const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [idEdit, setId] = useState(null);
  const dispatch = useDispatch();
  const myInput = useRef(null);
  const data = useSelector((state) => state.todoReducer.data);
  useEffect(() => {
    const getTodos = async () => {
      // const respone = await fetch(
      //   "https://6357f342c27556d28932afce.mockapi.io/api/v1/todos"
      // );
      // const todos = await respone.json();
      const todos = dispatch(fetchTodoList());
      // console.log({ todos });
      // const newData = todos.map((todo) => ({
      //   name: todo.name,
      //   id: todo.id,
      // }));
      // setData([...newData]);
      console.log({ data });
    };

    getTodos();
  }, []);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleAddTodo = async () => {
    // const res = await fetch(
    //   `https://6357f342c27556d28932afce.mockapi.io/api/v1/todos`,
    //   {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name: value }),
    //   }
    // );
    // const todo = await res.json();
    // console.log(todo);
    // setData([...data, todo]);
    // setValue("");
    dispatch(addTodoItemAsync(value));
    setValue("");
  };

  const handleEditTodo = async () => {
    if (idEdit === null) {
      return;
    }
    // const res = await fetch(
    //   `https://6357f342c27556d28932afce.mockapi.io/api/v1/todos/${idEdit}`,
    //   {
    //     method: "PUT",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name: value }),
    //   }
    // );
    // const todo = await res.json();
    // console.log(todo);
    // const newData = data.map((item) => {
    //   if (item.id === idEdit) {
    //     return {
    //       ...item,
    //       name: value,
    //     };
    //   }
    //   return item;
    // });
    // setData(newData);
    dispatch(editTodoItemAsync({ name: value, id: idEdit }));
    setValue("");
  };
  const handleChose = (todo) => {
    setValue(todo.name);
    setId(todo.id);
    myInput.current.focus();
  };
  const handleDeleteTodo = async (id) => {
    // const res = await fetch(
    //   `https://6357f342c27556d28932afce.mockapi.io/api/v1/todos/${id}`,
    //   {
    //     method: "DELETE",
    //   }
    // );
    // const deletedTodo = await res.json();
    // const newData = data.filter((item) => item.id !== id);
    // setData(newData);
    dispatch(deleteTodoItemAsync(id));
  };

  return (
    <div className="App">
      <div className="header">
        <h2>My To Do List</h2>
        <input
          ref={myInput}
          type="text"
          id="myInput"
          placeholder="Title..."
          value={value}
          onChange={handleChangeValue}
        />
        <button className="addBtn" onClick={handleAddTodo}>
          Add
        </button>
        <button className="addBtn" onClick={handleEditTodo}>
          Edit
        </button>
      </div>

      <ul>
        {data.map((item, index) => (
          <Todo
            key={index}
            todo={item}
            handleDeleteTodo={handleDeleteTodo}
            handleChose={handleChose}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
