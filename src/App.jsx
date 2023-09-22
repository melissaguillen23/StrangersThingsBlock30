import React from "react"
import { Routes, Route } from 'react-router-dom'
import NavBar from "./components/NavBar"
import Profile from "./pages/Profile"
import Posts from "./pages/Posts"
import Home from "./pages/Home"
import '../src/assets/App.css'
import LoginForm from "./components/Login"
import RegisterForm from "./components/Register"
import { AuthProvider } from "./API/Auth"
import CreatePostForm from "./components/AddPost"
import PostDetails from "./components/PostDetail"
import MessageForm from "./components/MessageForm"

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
        </Routes>
    </AuthProvider>
  )
}

export default App
