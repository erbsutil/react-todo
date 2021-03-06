import React from 'react';
import './App.css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button 
          disabled={ todo.isCompleted === true ? true : false }
          style={{ color: todo.isCompleted ? "silver" : "" }}
          onClick={() => completeTodo(index)}
        >
          <DoneRoundedIcon />
        </button>
        
        <button onClick={() => removeTodo(index)}> 
          <DeleteRoundedIcon />
        </button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new item"
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { 
      text: "Learn about react",
      isCompleted: false
    },
    { 
      text: "Meet friends for lunch",
      isCompleted: true
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>React To Do <DoneAllIcon className="doneAllIcon"/></h1>
      <div className="todo-list">
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
