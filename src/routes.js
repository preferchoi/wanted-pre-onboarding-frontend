import App from './App';
import Signin from './routes/signin';
import Signup from './routes/signup';
import Todo from './routes/todo';
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/signin",
      element: <Signin />
    },
    {
      path: "/todo",
      element: <Todo />
    },
  ]);