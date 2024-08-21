import { customFetch } from "../api/fetch";
import { Todo } from "./types/todo";
import CryptoJS from 'crypto-js';

const secretKey = 'aabbaa'

function decryptTitle(encryptedTitle: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedTitle, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export async function fetchTodo(): Promise<Todo[]> {
    try{
        const response = await customFetch('todo/show',{
            method: "POST",
        });
        if (!response.ok) {
            alert(response.text)
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Todo[] = await response.json();

        const decryptedTodos = data.map(todo => ({
            ...todo,
            title: decryptTitle(todo.title)
        }));
        return decryptedTodos
    }catch(e){
        console.error('Error fetching todos:', e);
        throw e;
    }
} 

export async function newTodo(title:string): Promise<Todo[]> {
    const encryptedTitle = CryptoJS.AES.encrypt(title, secretKey).toString();
    const newTodo ={
        "title":encryptedTitle
    }
    try{
        const response = await customFetch('todo/new', {
            method: "POST",
            body:JSON.stringify(newTodo)
        });
        if(!response.ok){
            throw new Error("Error verificar "+response)
        }
    }catch(err){
        alert(err)
    }
    return fetchTodo()
}

export async function deleteTodobyID(_id:number) {
    const todoId = {
        "id":_id
    }
    await customFetch('todo/delete', {
        method: 'DELETE',
        body:JSON.stringify(todoId)
    });
    return fetchTodo()
}

export async function setCompleted(id:number,completed:boolean) {
    const todoId = {
        "id":id,
        "completado":completed
    }
    await customFetch('todo/setCompleted', {
        method: 'PUT',
        body:JSON.stringify(todoId),
    });
    return fetchTodo()
}

export async function deleteAllComplete() {
    await customFetch('todo/deleteAllComplete', {
        method: 'DELETE'
    });
    return fetchTodo()
}