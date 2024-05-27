import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteTask, toggleComplete }) => {
  const [ todoListTemp, setTodoListTemp ] = useState(todoList)
  const [ taskStatus, setTaskStatus ] = useState('all');
  
  const handleTodoList = (taskStatus) => {
    if(taskStatus === 'all') {
      setTaskStatus('all')
      setTodoListTemp(todoList)
    } else if(taskStatus === 'ing') {
      setTaskStatus('ing')
      let temp = todoList.filter((item) => !item.isComplete);
      setTodoListTemp(temp)
    } else if(taskStatus === 'done') {
      setTaskStatus('done')
      let temp = todoList.filter((item) => item.isComplete === true);
      setTodoListTemp(temp)
    }
  }
  
  useEffect(() => {
    handleTodoList(taskStatus)
  },[todoList, taskStatus])

  return (
    <>
      <div className="todo-header">
        <h2>Todo List</h2>
        <div className="task-status">
          <div className={taskStatus === 'all' ? 'active' : ''} onClick={() => handleTodoList('all')}>전체</div>
          <div className={taskStatus === 'ing' ? 'active' : ''} onClick={() => handleTodoList('ing')}>진행중</div>
          <div className={taskStatus === 'done' ? 'active' : ''} onClick={() => handleTodoList('done')}>완료</div>
        </div>
      </div>
      <div className="todo-item-wrapper">
        {todoListTemp.length > 0 ? (
          todoListTemp.map((item, index) => <TodoItem key={index} item={item} deleteTask={deleteTask} toggleComplete={toggleComplete}/>)
        ) : (<div className="no-item">할일이 없습니다</div>)}
        
      </div>
    </>
  );
};

export default TodoBoard;
