import React, { useEffect } from 'react';
import { useNavigate  } from "react-router-dom";

export default function Todo() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (!token) {
            navigate('/signin');
        }
      }, []);

    return (
        <div>
            123
        </div>
    );
}