import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{Provider} from "react-redux"
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  AuthLayout from './components/index.js'
import Login from './components/index.js'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Signup from './components/index.js'
import AllPost from './pages/AllPost.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home />,
      },
      {
        path:"/login",
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
      },
      {
        path:"/all-posts",
        element: (
            <AuthLayout authentication={true}>
                <AllPost />
            </AuthLayout>
        ),
      },
      {
        path:"/add-post",
        element: (
            <AuthLayout authentication={true}>
                <AddPost />
            </AuthLayout>
        ),
      },
      {
        path:"/edit-post/:slug",
        element: (
            <AuthLayout authentication={true}>
              {" "}
                <EditPost />
            </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element: <Post />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>
)
