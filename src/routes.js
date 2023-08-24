import App from './App';
import Signin from './routes/signin';
import Signup from './routes/signup';
import Todo from './routes/todo';
import { createBrowserRouter } from "react-router-dom";
import  AuthLayout  from "./components/auth/layout";
import  TodosLayout  from "./components/todos/layout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/signup",
      element:<AuthLayout><Signup /></AuthLayout>
    },
    {
      path: "/signin",
      element: 
      <AuthLayout><Signin /></AuthLayout>

    },
    {
      path: "/todo",
      element: <TodosLayout><Todo /></TodosLayout>
    },
  ]);