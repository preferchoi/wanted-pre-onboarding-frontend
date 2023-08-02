import { Outlet, Link } from "react-router-dom";

export default function signup() {
    return (
        <div>
            <input data-testid="email-input" />
            <input data-testid="password-input" />
            <Link to={`/signin`}>
                <button data-testid="signup-button">회원가입</button>
            </Link>
        </div>
    );
}