import { Todo } from "../../assets/types/todo";

interface TodoSummaryProps{
    todos:Todo[];
    deleteCompleted: () => void;
}

export default function TodoSummary({
    todos,
    deleteCompleted
}:TodoSummaryProps){
    const completedTodos = todos.filter(todo => todo.completado);
    return(
        <div className="text-center space-y-2">
            <p className="text-sm font-medium">
                {completedTodos.length}/{todos.length} completed
            </p>
            {completedTodos.length > 0 && (
                <button className="text-red-500 hover:underline text-sm font-medium" onClick={deleteCompleted}>
                    Delete all completed
                </button>
            )}
        </div>
    );
}