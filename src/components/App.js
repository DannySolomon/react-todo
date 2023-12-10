import { getTodos } from "../api";
import TaskList from "./TaskList";
import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      if (response.status === 200) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.log("Error in fetching TODOs from API");
      }
    };

    fetchTodos();
  }, []);

  const editTask = (task) => {
    console.log("In edit task", task);
    let newTasks = tasks.filter((todo) => todo.id !== task.id);
    newTasks.push(task);
    newTasks.sort(function (a, b) {
      return a.id - b.id;
    });
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div id="container">
        <form>
          <input
            type="text"
            className="taskInput"
            placeholder="Enter task"
            required
          />
          <button type="submit">Add Task</button>
        </form>
        <div id="total-tasks">
          Total tasks: <span id="task-counter">0</span>
        </div>
        {tasks.map((task) => (
          <TaskList task={task} key={task.id} editTask={editTask} />
        ))}
      </div>
    </div>
  );
}

export default App;
