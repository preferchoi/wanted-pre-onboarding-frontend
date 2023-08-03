import React, { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
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

    useEffect(() => {
        const emailRegex = /^.*@.*$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

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
            <input data-testid="password-input" onChange={handlePasswordChange} value={password}/>
            <button data-testid="signin-button" disabled={!isEmailValid ^ !isPasswordValid} onClick={signin}>로그인</button>
        </div>
    );
}