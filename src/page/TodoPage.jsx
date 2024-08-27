import '../css/Common.css'
import "../css/TodoPage.css";

import TodoBoard from "../components/TodoBoard";

import { useEffect, useState } from "react";
import api from "../utils/api"
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const TodoPage = ({user, setUser}) => {
  const [ todoList, setTodoList ] = useState([]);
  const [ addTaskValue, setAddTaskValue ] = useState('');
  const [ today, setToday ] = useState('')
  const [ userName, setUserName ] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user) {
      navigate('/login')
    } else {
      setUserName(user.name)
      getTasks()
    }

    //오늘날짜 셋팅
    let today = new Date();
    setToday(`${String(today.getMonth() + 1)}월 ${String(today.getDate())}일`)
  },[user, navigate])

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
    console.log(res.data.data)
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
    setUser(null);
  }

  
  return (
    <>
      <div className="logout-btn" onClick={() => logout()}>로그아웃</div>
      <div className="header"><FontAwesomeIcon icon={faPen} className="icon-pen"/> To Do Board</div>
      <div className="container">
        <div className="info">
            <div className="user-name"><span>{userName}</span> 님</div>
            <div className="date">오늘은 <span>{today}</span></div>
        </div>
        <div className="add-item-row">
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={addTaskValue}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                addTask(addTaskValue);
                setAddTaskValue('');
              }
            }}
            onChange={(e) => setAddTaskValue(e.target.value)}
          />
          <button 
            className="button-add" 
            onClick={() => addTask(addTaskValue)}
          >
            <FontAwesomeIcon icon={faPlus} className="icon-plus"/>
          </button>
        </div>

        <TodoBoard todoList={todoList} deleteTask={deleteTask} toggleComplete={toggleComplete}/>
      </div>
    </>
  );
}

export default TodoPage;
