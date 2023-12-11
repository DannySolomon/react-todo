import React from "react";
import { deleteTodo, modifyTodo } from "../api";

const TaskList = ({ task, editTask, deleteTask }) => {
  const handleMarkComplete = async (task) => {
    task.completed = true;

    //deleting editMode for API
    let taskforAPI = task;
    delete taskforAPI["editMode"];

    const response = await modifyTodo(taskforAPI);
    if (response.status === 200) {
      editTask(task);
    } else {
      console.log("Error in editing TODO in API");
    }
  };

  const handleDelete = async (task) => {
    const response = await deleteTodo(task);
    if (response.status === 200) {
      deleteTask(task);
    } else {
      console.log("Error in editing TODO in API");
    }
  };

  return (
    <div className="todoItem" key={task.id}>
      <div>{task.title}</div>
      <button>Edit</button>
      <button onClick={() => handleDelete(task)}>Delete</button>
      <button
        disabled={task.completed}
        onClick={() => handleMarkComplete(task)}
      >
        {task.completed ? "Completed" : "Mark as Completed"}
      </button>
    </div>
  );
};

export default TaskList;
