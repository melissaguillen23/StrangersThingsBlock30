import React from "react"
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./API/Auth"
import NavBar from "./components/NavBar"
import Profile from "./pages/Profile"
import Posts from "./pages/Posts"
import Home from "./pages/Home"
import LoginForm from "./components/Login"
import RegisterForm from "./components/Register"
import CreatePostForm from "./components/AddPost"
import PostDetails from "./components/PostDetail"
import MessageForm from "./components/MessageForm"
import '../src/assets/App.css'
import '../src/assets/index.css'
import '../src/assets/NavBar.css'
import '../src/assets/Auth.css'
import '../src/assets/Pages.css'
import UpdatePost from "./components/UpdatePost"

function App() {

  return (
    <AuthProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/Addpost" element={<CreatePostForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/posts/:postId/messages" element={<MessageForm />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
