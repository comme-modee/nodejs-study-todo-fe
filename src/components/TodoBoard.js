import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteTask, toggleComplete }) => {
  return (
    <>
      <h2>Todo List</h2>
      <div className="todo-item-wrapper">
        {todoList.length > 0 ? (
          todoList.map((item, index) => <TodoItem key={index} item={item} deleteTask={deleteTask} toggleComplete={toggleComplete}/>)
        ) : (<h2>There is no Item to show</h2>)}
        
      </div>
    </>
  );
};

export default TodoBoard;
