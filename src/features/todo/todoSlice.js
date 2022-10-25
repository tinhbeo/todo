import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    delete: (state) => {
      state.value -= 1;
    },
    edit: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    /// Redux-thunk
    builder.addCase(fetchTodoList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTodoList.rejected, (state, action) => {
      state.loading = false;
    });
    // builder.addCase(addTodoItemAsync.pending, (state, action) => {});
    // builder.addCase(addTodoItemAsync.fulfilled, (state, action) => {});
    // builder.addCase(addTodoItemAsync.rejected, (state, action) => {});
    // builder.addCase(editTodoItemAsync.pending, (state, action) => {});
    // builder.addCase(editTodoItemAsync.fulfilled, (state, action) => {});
    // builder.addCase(editTodoItemAsync.rejected, (state, action) => {});
    // builder.addCase(deleteTodoItemAsync.pending, (state, action) => {});
    // builder.addCase(deleteTodoItemAsync.fulfilled, (state, action) => {});
    // builder.addCase(deleteTodoItemAsync.rejected, (state, action) => {});
  },
});

export const fetchTodoList = createAsyncThunk(
  "todoList/fetchTodoList",
  async (payload, thunkAPI) => {
    const response = await fetch(
      "https://6357f342c27556d28932afce.mockapi.io/api/v1/todos"
    );
    const todo = await response.json();
    return todo;
  }
);

export const addTodoItemAsync = createAsyncThunk(
  "todoList/addTodoItemAsync",
  async (payload, thunkAPI) => {
    const res = await fetch(
      `https://6357f342c27556d28932afce.mockapi.io/api/v1/todos`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: payload }),
      }
    );
    const todo = await res.json();
    thunkAPI.dispatch(fetchTodoList());
    return todo;
  }
);

export const editTodoItemAsync = createAsyncThunk(
  "todoList/editTodoItemAsync",
  async (payload, thunkAPI) => {
    const res = await fetch(
      `https://6357f342c27556d28932afce.mockapi.io/api/v1/todos/${payload.id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: payload.name }),
      }
    );
    const todo = await res.json();
    thunkAPI.dispatch(fetchTodoList());
    return todo;
  }
);

export const deleteTodoItemAsync = createAsyncThunk(
  "todoList/deleteTodoItemAsync",
  async (payload, thunkAPI) => {
    const itemId = payload;
    const res = await fetch(
      `https://6357f342c27556d28932afce.mockapi.io/api/v1/todos/${payload}`,
      {
        method: "DELETE",
      }
    );
    const deletedTodo = await res.json();
    thunkAPI.dispatch(fetchTodoList());
    return deletedTodo;
  }
);

export default todoSlice.reducer;
