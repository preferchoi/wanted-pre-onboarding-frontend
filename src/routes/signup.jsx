import React, { useState, useCallback  } from 'react';
import signup from "../api/auth/signup";
import Form from "../components/auth/form"
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    // 유효성 체크, 버튼 활성화
    const handleValidationChange = useCallback((valid) => {
        setIsValid(valid);
    }, []);

    const handleUserDataChange = useCallback((email, password) => {
        setEmail(email);
        setPassword(password);
    }, []);

    // 회원가입 요청
    const clickSignup = async () => {
        signup(email, password)
        .then(() => {
            navigate('/signin');
        })
    };

    return (
        <div>
            <Form onValidationChange={handleValidationChange} onUserDataChange={handleUserDataChange} />
            <br></br>
            <button data-testid="signup-button" disabled={!isValid} onClick={clickSignup}>회원가입</button>
        </div>
    );
}