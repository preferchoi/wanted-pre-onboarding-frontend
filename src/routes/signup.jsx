import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import signup from "../api/auth/signup";
import Form from "../components/auth/form"


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    // 유효성 체크, 버튼 활성화
    const handleValidationChange = (valid) => {
        setIsValid(valid);
    };

    const handleUserDataChange = (email, password) => {
        setEmail(email);
        setPassword(password);
    };

    // 회원가입 요청
    const clickSignup = async () => {
        signup(email, password)
        .then(() => {
            navigate('/signin');
        })
    };

    // 토큰 존재할 시 /todo로 리다이렉트
    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            navigate('/todo');
        }
    }, []);

    return (
        <div>
            <Form onValidationChange={handleValidationChange} onUserDataChange={handleUserDataChange} />
            <br></br>
            <button data-testid="signup-button" disabled={!isValid} onClick={clickSignup}>회원가입</button>
        </div>
    );
}