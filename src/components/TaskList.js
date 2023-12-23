import React, { useState } from "react";
import { deleteTodo, modifyTodo } from "../api";

const TaskList = ({ task, editTask, deleteTask }) => {
  const [editModeTask, setEditModeTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const handleMarkComplete = async () => {
    let taskforAPI = task;
    taskforAPI.completed = true;

    const response = await modifyTodo(taskforAPI);
    if (response.status === 200) {
      editTask(task);
    } else {
      console.log("Error in editing TODO in API");
    }
  };

  const handleDelete = async () => {
    const response = await deleteTodo(task);
    if (response.status === 200) {
      deleteTask(task);
    } else {
      console.log("Error in deleting TODO in API");
    }
  };

  const handleEdit = () => {
    setEditModeTask(true);
  };

  const handleEditSave = async () => {
    //console.log(newTaskTitle);
    //let newTaskString = JSON.stringify(task);
    let newTask = { ...task, title: newTaskTitle };
    //newTask.title = newTaskTitle;
    console.log(task);
    const response = await modifyTodo(newTask);
    if (response.status === 200) {
      editTask(newTask);
    } else {
      setNewTaskTitle(task.title);
      console.log("Error in editing TODO in API");
    }
    setEditModeTask(false);
  };

  const handleEditCancel = () => {
    setEditModeTask(false);
    setNewTaskTitle(task.title);
  };

  return (
    <div className="todoItem" key={task.id}>
      {!editModeTask && <div>{task.title}</div>}
      {editModeTask && (
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        ></input>
      )}
      {!editModeTask && <button onClick={handleEdit}>Edit</button>}
      {editModeTask && <button onClick={handleEditSave}>Save</button>}
      {!editModeTask && <button onClick={handleDelete}>Delete</button>}
      {editModeTask && <button onClick={handleEditCancel}>Cancel</button>}
      {!editModeTask && (
        <button disabled={task.completed} onClick={handleMarkComplete}>
          {task.completed ? "Completed" : "Mark as Completed"}
        </button>
      )}
    </div>
  );
};

export default TaskList;
