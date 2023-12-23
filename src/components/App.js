import { addTodos, getTodos } from "../api";
import TaskList from "./TaskList";
import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  //need to reverse array so that the higher ids will come first , so during edit(markascomplete), when sorted, the newly added ones by us wont go to the bottom

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

  const addTask = async (e) => {
    e.preventDefault();
    const date = new Date();
    const task = {
      userId: 1,
      id: date.valueOf(),
      title: taskTitle,
      completed: false,
    };
    const response = await addTodos(task);
    if (response.status === 201) {
      const newTasks = tasks;
      newTasks.unshift(task); //adding the task to the top of the list

      setTasks(newTasks);
    } else {
      console.log("Error in adding TODO to API");
    }
    setTaskTitle("");
  };

  const editTask = (task) => {
    console.log("In edit task", task);
    let newTasks = tasks.filter((todo) => todo.id !== task.id);
    newTasks.push(task);
    newTasks.sort(function (a, b) {
      return a.id - b.id;
    });
    setTasks(newTasks);
  };

  const deleteTask = (task) => {
    console.log("In delete task", task);
    let newTasks = tasks.filter((todo) => todo.id !== task.id);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div id="container">
        <form onSubmit={addTask}>
          <input
            type="text"
            className="taskInput"
            placeholder="Enter task"
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <div id="total-tasks">
          Total tasks: <span id="task-counter">{tasks.length}</span>
        </div>
        {tasks?.map((task) => (
          <TaskList
            task={task}
            key={task.id}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
