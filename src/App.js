
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/signin');
    }, [navigate]);

    return <h1>hello</h1>
}

