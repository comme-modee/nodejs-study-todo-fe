import "../css/TodoPage.css";

import TodoBoard from "../components/TodoBoard";

import { useEffect, useState } from "react";
import api from "../utils/api"
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const [ todoList, setTodoList ] = useState([]);
  const [ addTaskValue, setAddTaskValue ] = useState('');
  // const [ year, setYear ] = useState('')
  const [ today, setToday ] = useState('')
  const name = sessionStorage.getItem('userName');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token) {
      navigate('/login')
    } else {
      getTasks()
    }

    //오늘날짜 셋팅
    let today = new Date();
    setToday(`${String(today.getMonth() + 1)}월 ${String(today.getDate())}일`)
  },[token])

  const addTask = async () => {
    const res = await api.post('/tasks', {
      task: addTaskValue,
      isComplete: false
    })
    if(res.status === 200) {
      getTasks()
      setAddTaskValue('')
    } else {
      console.log('등록 실패')
    }
  }

  const getTasks = async () => {
    const res = await api.get('/tasks')
    setTodoList(res.data.data)
  }

  const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    if(res.status === 200) {
      getTasks()
    } 
  }

  const toggleComplete = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`);
      if(res.status === 200) {
        getTasks()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const logout = () => {
    sessionStorage.clear();
    navigate('/login')
  }

  
  return (
    <>
      <div className="logout-btn" onClick={() => logout()}>로그아웃</div>
      <div className="header"><FontAwesomeIcon icon={faPen} className="icon-pen"/> Todo Board</div>
      <div className="container">
        <div className="info">
            <div className="user-name"><span>{name}</span> 님</div>
            <div className="date">Date. <span>{today}</span></div>
        </div>
        <div className="add-item-row">
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={addTaskValue}
            onChange={(e) => setAddTaskValue(e.target.value)}
          />
          <button className="button-add" onClick={() => addTask(addTaskValue)}><FontAwesomeIcon icon={faPlus} className="icon-plus"/></button>
        </div>

        <TodoBoard todoList={todoList} deleteTask={deleteTask} toggleComplete={toggleComplete}/>
      </div>
    </>
  );
}

export default TodoPage;
