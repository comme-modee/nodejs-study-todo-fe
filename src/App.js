// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./css/TodoPage.css";

import TodoBoard from "./components/TodoBoard";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [ todoList, setTodoList ] = useState([]);
  const [ addTaskValue, setAddTaskValue ] = useState('');

  useEffect(()=>{
    getTasks()
  },[])

  const getTasks = async () => {
      try {
          const res = await api.get('/tasks');
          setTodoList(res.data.data)
      } catch (error) {
        
      }
  }

  const addTask = async () => {
    try {
      const res = await api.post('/tasks', {
        task: addTaskValue,
        isComplete: false
      })
      if(res.status === 200) {
        setAddTaskValue('')
        getTasks()
      } else {
        throw new Error('할일 추가 실패')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`)
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

  return (
    <>
    <div className="header"><FontAwesomeIcon icon={faPen} className="icon-pen"/> Todo Board</div>
      <div className="container">
        {/* <div className="info">
            <div className="user-name">{name} 님</div>
            <div className="date">Date. {today}</div>
        </div> */}
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

export default App;
