import React from "react";
import { faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoItem = ({ item, deleteTask, toggleComplete }) => {
  
  return (
    <div className={`todo-item ${item.isComplete ? 'todo-item-done' : ''}`}>
      <div className={`todo-content ${item.isComplete ? 'todo-content-done' : ''}`}>{item.task}</div>

      <div className="btn-wrapper">
        <button className={`button-status ${item.isComplete ? 'done' : 'ing'}`} onClick={() => toggleComplete(item._id)}><FontAwesomeIcon icon={faCheck}/></button>
        <button className="button-delete" onClick={() => deleteTask(item._id)}><FontAwesomeIcon icon={faMinus}/></button>
      </div>
    </div>
);
};

export default TodoItem;
