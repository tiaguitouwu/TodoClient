import { Route, Routes } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Todo" element={<TodoApp/>}/>
            <Route path="/Register" element={<Signup/>}/>
        </Routes>
    </>
  )
}

export default App


