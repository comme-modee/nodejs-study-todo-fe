import { Routes, Route } from "react-router-dom";
import TodoPage from "./page/TodoPage";
import Login from "./page/Login";
import Join from "./page/Join";


function App() {
  
  return (
    <Routes>
      <Route index element={<TodoPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
    </Routes>
  );
}

export default App;
