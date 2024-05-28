import { Routes, Route } from "react-router-dom";
import TodoPage from "./page/TodoPage";
import Login from "./page/Login";
import Join from "./page/Join";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";
import JoinSuccess from "./page/JoinSuccess";


function App() {

  const [ user, setUser ] = useState(null);

  const getUser = async () => {
    try {
        const token = sessionStorage.getItem('token');
        if(token) {
          const res = await api.get('/user/me');
          if(res.status === 200) {
            setUser(res.data.user)
          } 
        }
    } catch (error) {
      setUser(null)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  useEffect(()=>{
    console.log('user:', user)
  },[user])
  
  return (
    <Routes>
      <Route index element={
        <PrivateRoute user={user}>
          <TodoPage user={user} setUser={setUser}/>
        </PrivateRoute>
      }/>
      <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/join/pass" element={<JoinSuccess/>}/>
    </Routes>
  );
}

export default App;
