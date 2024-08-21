import { Todo } from "../../assets/types/todo";
import TodoItem from "./TodoItem";

interface TodoItemProps{
    todos:Todo[];
    onComplete:(id:number, completed:boolean) => void;
    onDelete:(id:number) => void;
}

export default function RenderTodo({
    todos,
    onComplete,
    onDelete
}:TodoItemProps){
    const todoSorted = todos.sort((a,b)=>{
        if(a.completado === b.completado){return b._id - a._id}
        return a.completado ? 1 : -1
    })
    return(
        <>
        <div className="space-y-2">
          {todoSorted.map(todo => (
              <TodoItem 
                key={todo._id}
                todo={todo}
                onComplete={onComplete}
                onDelete={onDelete}
              />
          ))}
        </div>
        {todos.length === 0 && (
            <p className="text-center text-sm text-gray-500">Not ToDo's yet</p>
        )}
        </>
    )

}