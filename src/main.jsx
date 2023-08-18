import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root';
import Homepage from './components/Homepage';
import Post from './components/Post';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import SendMessage from './components/SendMessage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
      {
        path: "/newpost",
        element: <NewPost />,
      },
      {
        path: "/posts/:postId/messages",
        element: <SendMessage />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
