import { useState } from "react";

export default function AddTodoForm({ onNewTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/v1/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodoTitle, completed: false }),
    })
      .then((response) => response.json)
      .then((newTodo) => {
        onNewTodo(newTodo);
        setNewTodoTitle("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        title={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
