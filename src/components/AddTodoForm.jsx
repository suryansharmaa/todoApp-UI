import { useState } from "react";

export default function AddTodoForm({ onNewTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/v1/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodoTitle, completed: false }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.errors[0].defaultMessage);
          });
        }
        return response.json();
      })
      .then((newTodo) => {
        onNewTodo(newTodo);
        setNewTodoTitle("");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new task..."
          className="block w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0 transition-shadow shadow-sm hover:shadow-lg focus:shadow-lg"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
