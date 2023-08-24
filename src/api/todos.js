import { instance } from './index.js'

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;

export function createTodo(todo) {
    // return 
}


export function getTodos(todo) {
    // return instance.get("/todos")
}


export function updateTodo(todo) {
    // return 
}


export function deleteTodo(todo) {
    // return 
}

