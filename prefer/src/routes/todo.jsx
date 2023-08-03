import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Todo() {
    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [todos, setTodos] = useState(localStorage.getItem("todos").split(',') || []);

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (!token) {
            navigate('/signin');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', todos);
    }, [todos])

    const onChange = (event) => {
        setContent(event.target.value);
    }

    const onClickAdd = () => {
        setTodos([...todos, content])
        setContent("")
    }

    const onDelete = (idx) => {
        setTodos(todos.filter((_, index) => index !== idx));
    }

    return (
        <div>
            <input data-testid="new-todo-input" onChange={onChange} value={content}/>
            <button data-testid="new-todo-add-button" onClick={onClickAdd}>추가</button>
            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx}>
                        <label>
                            <input type="checkbox" />
                            <span>{todo}</span>
                        </label>
                        <button data-testid="modify-button">수정</button>
                        <button data-testid="delete-button" onClick={() => onDelete(idx)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}