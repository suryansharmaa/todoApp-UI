import { useEffect, useState } from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleNewTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>

      <AddTodoForm onNewTodo={handleNewTodo} />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
