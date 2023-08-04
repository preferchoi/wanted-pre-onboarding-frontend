import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // 이메일 유효성 체크
    useEffect(() => {
        const emailRegex = /^.*@.*$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    // 비밀번호 유효성 체크
    useEffect(() => {
        const passwordRegex = /^.{8,}$/;
        setIsPasswordValid(passwordRegex.test(password));
    }, [password]);

    // 회원가입 요청
    const signup = async () => {
        try {
            const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', { email, password });
            if (response.status === 201) {
                navigate('/signin');
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
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
            <input data-testid="email-input" onChange={handleEmailChange} value={email} />
            <input data-testid="password-input" onChange={handlePasswordChange} value={password} />
            <button data-testid="signup-button" disabled={!isEmailValid ^ !isPasswordValid} onClick={signup}>회원가입</button>
        </div>
    );
}