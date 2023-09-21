import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import '../assets/Auth.css'
import api from '../API/ST_API'
import { useAuth } from "../API/Auth"; 

export default function LoginForm() {
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Handling login...')
        try {
            const response = await api.login(username, password);
            const token = response.data.token
            api.setToken(token)
            login(token)
            setLoginSuccess(true)
            console.log('loginSuccess:', loginSuccess)
            setTimeout(() => setLoginSuccess(false), 3000)
            console.log('Login successful')
            navigate("/profile")
            
        } catch (error) {
            console.error(error)
            setError("Login Failed. Please try again.", error)
            }
        }

    return (
        <div className="login-container">
            {loginSuccess && <div className="success-message">Success: Successfully logged in!</div>}
            <div className="login-form">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="6"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </div>
                 <button type="submit">Log in!</button>
                 <div>
                    <span>
                        New Here? <Link to="/Register">Create an Account</Link>
                    </span>
                 </div>
            </form>
        </div>
     </div>
    )
}