import { useState, useEffect } from "react";
import todo_icon from "./assets/todo_icon.png";
import not_tick from "./assets/not_tick.png";
import tick from "./assets/check.png";
import delete_icon from "./assets/delete.png";

const App = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [newTodo, setNewTodo] = useState("");
  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo != "") {
      setTodos((prevtodos) => [
        ...prevtodos,
        {
          id: todos.length + 1,
          text: newTodo.trim(),
          isComplete: false,
        },
      ]);
    }
    setNewTodo("");
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(todos);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-[900px]  max-h-[70vh] size-2/3 flex flex-col items-center py-4 px-1.5 rounded-4xl gap-6 md:py-8 md:px-3 md:gap-10">
        {/* Title */}
        <div className="flex justify-center items-center gap-4 mt-3 cursor-default">
          <img src={todo_icon} alt="todo_icon" className="size-10 md:size-12" />
          <p className="text-2xl font-semibold md:text-4xl">Todo List</p>
        </div>

        {/* Input Task */}
        <form
          className="bg-gray-300 text-lg font-medium w-11/12 min-h-14 flex gap-2 rounded-4xl justify-between md:text-2xl md:min-h-18"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Add your task"
            className="outline-0 w-2/3 ml-5 my-1 font-normal md:ml-8"
            value={newTodo}
            onChange={handleChange}
          />
          <button className="bg-[#1DA1F2] rounded-r-4xl text-white w-1/3 min-w-[60px] max-w-[150px] cursor-pointer transition-color duration-100 ease-in-out hover:bg-[#1DA1F2]/60 active:bg-[#1DA1F2]">
            ADD
          </button>
        </form>

        {/* Todos */}
        <ul className="w-full flex flex-col gap-6 px-4 py-2 items-start text-lg font-normal overflow-auto md:px-10 md- md:text-2xl">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`w-full flex justify-between items-center decoration-2 decoration-[#1DA1F2] ${
                todo.isComplete ? "line-through text-gray-500" : ""
              }`}
            >
              <div
                className="flex items-center gap-3 cursor-pointer transition-transform md:gap-5 hover:scale-95 active:scale-110"
                onClick={() => toggleComplete(todo.id)}
              >
                <img
                  src={todo.isComplete ? tick : not_tick}
                  alt="tick"
                  className="size-5 md:size-9"
                />
                <p>{todo.text}</p>
              </div>
              <img
                src={delete_icon}
                alt="delete"
                className="size-5 mr-2 cursor-pointer transition-transform md:size-9 hover:scale-90 hover:bg-active:scale-110"
                onClick={() => deleteTodo(todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
