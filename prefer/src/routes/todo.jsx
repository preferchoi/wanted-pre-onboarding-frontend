import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Todo() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")

    const [content, setContent] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        if (!token) {
            navigate('/signin');
        } else {
            getTodos()
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', todos);
    }, [todos])

    const onChange = (event) => {
        setContent(event.target.value);
    }

    // const onClickAdd = () => {
    //     setTodos([...todos, content])
    //     setContent("")
    // }

    const createTodo = async () => {
        try {
            const response = await axios.post(
                "https://www.pre-onboarding-selection-task.shop/todos",
                { "todo": content },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                },
            )
            if (response.status === 201) {
                setTodos([...todos, response.data])
                setContent("")
                return [...todos, response.data]
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    const getTodos = async () => {
        try {
            const response = await axios.get(
                "https://www.pre-onboarding-selection-task.shop/todos",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                },
            );
            if (response.status === 200) {
                setTodos(response.data);
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    const onDelete = async (idx) => {
        try {
            const response = await axios.delete(
                `https://www.pre-onboarding-selection-task.shop/todos/${idx}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                },
            )
            if (response.status === 204) {
                setTodos(todos.filter((todo) => todo.id !== idx));
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    return (
        <div>
            <input data-testid="new-todo-input" onChange={onChange} value={content} />
            <button data-testid="new-todo-add-button" onClick={createTodo}>추가</button>

            <ul>
                {todos.map((todo => (
                    <li key={todo.id}>
                        <label>
                            <input type="checkbox" />
                            <span>{todo.todo}</span>
                        </label>
                        <button data-testid="modify-button">수정</button>
                        <button data-testid="delete-button" onClick={() => onDelete(todo.id)}>삭제</button>
                    </li>
                )))}
            </ul>
        </div>
    );
}