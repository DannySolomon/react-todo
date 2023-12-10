import React from "react";
import { modifyTodo } from "../api";

const TaskList = ({ task, editTask }) => {
  const handleMarkComplete = async (task) => {
    task.completed = true;
    const response = await modifyTodo(task);
    if (response.status === 200) {
      editTask(task);
    } else {
      console.log("Error in editing TODO in API");
    }
  };
  return (
    <div className="todoItem" key={task.id}>
      <div>{task.title}</div>
      <button>Edit</button>
      <button>Delete</button>
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
