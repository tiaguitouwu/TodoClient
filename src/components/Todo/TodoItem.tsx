import { Trash2 } from "lucide-react";
import { Todo } from "../../assets/types/todo";

interface TodoItemProps{
    todo:Todo;
    onComplete:(id:number, completed:boolean) => void;
    onDelete:(id:number) => void;
}

export default function TodoItem({todo, onComplete, onDelete}: TodoItemProps){
    return (
        <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
                <input
                    type="checkbox"
                    checked = {todo.completado}
                    onChange={(e) => onComplete(todo._id,e.target.checked)}
                    className="scale-125"
                />
                <span className={todo.completado ? "line-through text-gray-400" : ""}>{todo.title}</span>
            </label>
            <button onClick={()=>onDelete(todo._id)} className="p-2">
                <Trash2 size={20} className="text-gray-500" />
            </button>
        </div>
    )
}