import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [PW, setPW] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPWValid, setIsPWValid] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePWChange = (event) => {
        setPW(event.target.value);
    };

    useEffect(() => {
        const emailRegex = /^.*@.*$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        const PWRegex = /^.{8,}$/;
        setIsPWValid(PWRegex.test(PW));
    }, [PW]);

    return (
        <div>
            <input data-testid="email-input" onChange={handleEmailChange} value={email}/>
            <input data-testid="password-input" onChange={handlePWChange} value={PW} />
            <Link to={`/signin`}>
                <button data-testid="signup-button" disabled={!isEmailValid ^ !isPWValid}>회원가입</button>
            </Link>
        </div>
    );
}