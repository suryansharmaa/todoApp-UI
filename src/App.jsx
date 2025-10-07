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

  const handleDelete = (idToDelete) => {
    fetch(`http://localhost:8080/api/v1/todos/${idToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos(todos.filter((todo) => todo.id !== idToDelete));
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleUpdate = (id, completionStatus) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    fetch(`http://localhost:8080/api/v1/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todoToUpdate.title,
        completed: completionStatus,
      }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Todo App
        </h1>
        <AddTodoForm onNewTodo={handleNewTodo} />

        <div className="space-y-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  todo.completed
                    ? "bg-gray-900 opacity-50"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleUpdate(todo.id, !todo.completed)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      todo.completed
                        ? "border-green-500 bg-green-500"
                        : "border-gray-500"
                    } flex items-center justify-center mr-4 transition-all`}
                  >
                    {todo.completed && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-lg ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You're all caught up!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
