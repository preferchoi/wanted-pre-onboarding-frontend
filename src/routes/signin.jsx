import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import signin from "../api/auth/signin";
import Form from "../components/auth/form"

export default function Signin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    // 로그인 처리 로직
    const clickSignin = async () => {
        signin(email, password)
        .then((res) => {
            localStorage.setItem('access_token', res.access_token);
            navigate('/todo');
        })
    };

    // 토큰 존재할 시 /todo로 리다이렉트
    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            navigate('/todo');
        }
    }, []);

    // 유효성 체크, 버튼 활성화
    const handleValidationChange = (valid) => {
        setIsValid(valid);
    };

    const handleUserDataChange = (email, password) => {
        setEmail(email);
        setPassword(password);
    };
    

    return (
        <div>
            <Form onValidationChange={handleValidationChange} onUserDataChange={handleUserDataChange} />
            <br></br>
            <button data-testid="signin-button" disabled={!isValid} onClick={clickSignin}>로그인</button>
        </div>
    );
}