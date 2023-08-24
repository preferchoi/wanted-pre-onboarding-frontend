import React, { useState, useEffect } from 'react';

export default function Form({ onValidationChange, onUserDataChange }) {

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

    // 상위 항목으로 emit
    useEffect(()=>{
        onUserDataChange(email, password)
    },[email, password])
    
    useEffect(() => {
        onValidationChange(isEmailValid && isPasswordValid);
    }, [isEmailValid, isPasswordValid]);



    return(
        <div>
            <label for="e-mail">e-mail: </label>
            <input id="e-mail" data-testid="email-input" onChange={handleEmailChange} value={email} />
            <br></br>
            <label for="password">password: </label>
            <input id="password" data-testid="password-input" onChange={handlePasswordChange} value={password} />
        </div>
    );
}