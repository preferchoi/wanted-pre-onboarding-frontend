import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Todo() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")

    const [content, setContent] = useState("");
    const [todos, setTodos] = useState([]);
    // 현재 수정중인 todo index
    const [updateTarget, setUpdateTarget] = useState(null);

    // todos 변경 시 로컬스토리지 저장
    useEffect(() => {
        localStorage.setItem('todos', todos);
    }, [todos])

    const onChange = (event) => {
        setContent(event.target.value);
    }

    // 데이터 생성
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
            console.error('create failed:', error);
        }
    }

    // 데이터 호출
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
            console.error('get failed:', error);
        }
    }
    // 데이터 수정
    const updateTodoChecked = async (idx, TF) => {
        const t = todos.filter((todo) => todo.id === idx)
        try {
            const response = await axios.put(
                `https://www.pre-onboarding-selection-task.shop/todos/${idx}`,
                {
                    "todo": t[0].todo,
                    "isCompleted": t[0].isCompleted ? TF : !t[0].isCompleted
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                },
            )
            const data = response.data
            if (response.status === 200) {
                setTodos(todos.map((item) => {
                    if (item.id === data.id) {
                        return data
                    } else {
                        return item
                    }
                }))
                setUpdateTarget(null)
            }
        } catch (error) {
            console.error('update failed:', error);
        }
    }

    // 데이터 삭제
    const deleteTodo = async (idx) => {
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
            console.error('delete failed:', error);
        }
    }
    
    // 체크박스 동기화 위한 onChange
    const handleCheckChange = (id, checked) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: checked } : todo));
        updateTodoChecked(id, false);
    };

    // 수정 내용 동기화 위한 onChange
    const handleTodoChange = (id, newTodo) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: newTodo } : todo));
    };

    return (
        <div>
            <input data-testid="new-todo-input" onChange={onChange} value={content} />
            <button data-testid="new-todo-add-button" onClick={createTodo}>추가</button>

            <ul>
                {todos.map((todo => (
                    todo.id === updateTarget ? (
                        <li key={todo.id}>
                            <label>
                                <input type="checkbox" checked={todo.isCompleted} onChange={(e) => handleCheckChange(todo.id, e.target.checked)} />
                                <input data-testid="modify-input" type="text" onChange={(e) => handleTodoChange(todo.id, e.target.value)} value={todo.todo} />
                            </label>
                            <button data-testid="submit-button" onClick={() => updateTodoChecked(todo.id, true)}>수정</button>
                            <button data-testid="cancel-button" onClick={() => setUpdateTarget(null)}>취소</button>
                        </li>
                    ) : (
                        <li key={todo.id}>
                            <label>
                                <input type="checkbox" checked={todo.isCompleted} onChange={(e) => handleCheckChange(todo.id, e.target.checked)} />
                                <span>{todo.todo}</span>
                            </label>
                            <button data-testid="modify-button" onClick={() => setUpdateTarget(todo.id)}>수정</button>
                            <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
                        </li>
                    )
                )))}
            </ul>
        </div>
    );
}