import React, { useState } from "react";
import { deleteTodo, modifyTodo } from "../api";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const TaskList = ({ task, editTask, deleteTask }) => {
  const [editModeTask, setEditModeTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const handleMarkComplete = async () => {
    let taskforAPI = task;
    taskforAPI.completed = true;

    const response = await modifyTodo(taskforAPI);
    if (response.status === 200) {
      editTask(task);
      toast.success("Successfully marked task as complete");
    } else {
      toast.error("Error in marking TODO as complete");
      console.log("Error in editing TODO in API");
    }
  };

  const handleDelete = async () => {
    const response = await deleteTodo(task);
    if (response.status === 200) {
      deleteTask(task);
      toast.success("Successfully deleted task");
    } else {
      toast.error("Error in deleting task");
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
      toast.success("Successfully editted task");
    } else {
      setNewTaskTitle(task.title);
      toast.error("Error in editing task");
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
      {!editModeTask && (
        <div>
          <h5>{task.title}</h5>
        </div>
      )}
      {editModeTask && (
        <input
          className="editInput"
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        ></input>
      )}
      {!editModeTask && <Button onClick={handleEdit}>Edit</Button>}
      {editModeTask && (
        <Button onClick={handleEditSave} variant="success">
          Save
        </Button>
      )}
      {!editModeTask && (
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      )}
      {editModeTask && (
        <Button onClick={handleEditCancel} variant="danger">
          Cancel
        </Button>
      )}
      {!editModeTask && (
        <Button
          variant="success"
          disabled={task.completed}
          onClick={handleMarkComplete}
        >
          {task.completed ? "Completed" : "Mark as Completed"}
        </Button>
      )}
    </div>
  );
};

export default TaskList;
