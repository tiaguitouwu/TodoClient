import { useEffect, useState } from "react";
import { Todo } from "../assets/types/todo";
import { deleteTodobyID, fetchTodo, newTodo, setCompleted,deleteAllComplete } from "../assets/todos";

export default function useTodos(){

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodo().then((data) => setTodos(data));
    }, []);
    
    function setComplete(id:number, completado:boolean) {
        setCompleted(id,completado).then((data) => setTodos(data))
    }
    
    function addTodo(title:string){
        newTodo(title).then((data) => setTodos(data))
    }
    
    function deleteTodo(id:number){
        deleteTodobyID(id).then((data) => setTodos(data))
    }

    function deleteAllCompleted(){
        deleteAllComplete().then((data) => setTodos(data))
    }

    return{
        todos,
        addTodo,
        setComplete,
        deleteTodo,
        deleteAllCompleted
    }

}