import AddTodo from "./Todo/AddTodo"
import RenderTodo from "./Todo/RenderTodo"
import TodoSummary from "./Todo/TodoSummary"
import useTodos from "../hooks/useTodo"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkSession } from "../api/checksession";

function Todo() {

  const{  
    todos,
    setComplete,
    addTodo,
    deleteTodo,
    deleteAllCompleted
  } = useTodos();

  const navigate = useNavigate();
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const valid = await checkSession(navigate);
        if (valid) {
          setIsSessionValid(true);
        } else {
          navigate("/", { state: { error: "Session expired. Please log in again." } });
        }
      } catch (error) {
        navigate("/", { state: { error: "Error checking session. Please log in again." } });
      }
    };
    verifySession();
  }, [navigate]);

  if (isSessionValid === null) {
    return <div>Loading...</div>;
  }

  if (!isSessionValid) {
    return <div>Error: Invalid session.</div>;
  }
  return (
    <main className='py-5 h-screen space-y-5 overflow-y-auto font-mono'>
      <div className="text-right">
          <a href="./" className="font-bold text-sm text-right px-5 text-blue-500 hover:text-blue-700">
            Sign Out
          </a>
        </div>
      <h1 className='font-bold text-3xl text-center'>To Do</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodo onSubmit={addTodo}/>
        <RenderTodo
          todos={todos}
          onComplete={setComplete}
          onDelete={deleteTodo}
        />
      </div>
      <TodoSummary
        todos={todos}
        deleteCompleted={deleteAllCompleted}
      />
    </main>
  )
}

export default Todo
