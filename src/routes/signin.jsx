import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Signin() {

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

    // 로그인 처리 로직
    const signin = async () => {
        try {
            const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', { email, password });
            if (response.status === 200) {
                console.log(response.data.access_token);
                localStorage.setItem('access_token', response.data.access_token);
                navigate('/todo');
            }
        } catch (error) {
            console.error('Signin failed:', error);
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
            <label for="e-mail">e-mail: </label>
            <input id="e-mail" data-testid="email-input" onChange={handleEmailChange} value={email} />
            <br></br>
            <label for="password">password: </label>
            <input id="password" data-testid="password-input" onChange={handlePasswordChange} value={password} />
            <br></br>
            <button data-testid="signin-button" disabled={!(isEmailValid && isPasswordValid)} onClick={signin}>로그인</button>
        </div>
    );
}