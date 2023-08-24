import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  // 토큰 존재할 시 /todo로 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
      {children}
    </div>
  );
}