import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import '../assets/Auth.css'
import api from '../API/ST_API'
import { useAuth } from "../API/Auth"; 

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()
    const location = useLocation()
    const logoutMessage = location.state?.message
    const [displayMessage, setDisplayMessage] = useState(logoutMessage)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await api.login(username, password);
            const token = response.data.token
            if (token) {
                api.setToken(token)
                login(token)
                setDisplayMessage("Success: Successfully logged in.")
                setTimeout(() => {
                    setDisplayMessage(null)
                    navigate("/profile")
                }, 1000)
            } else {
                setDisplayMessage("Login Failed: Unable to log in. Please try again.")
            } 
        } catch (error) {
            console.error(error)
            setError("Login Failed. Please try again.")
            setDisplayMessage("Failed: Unable to log in.")
        }
    }

    useEffect(() => {
        if (displayMessage) {
            const timer = setTimeout(() => {
                setDisplayMessage(null)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [displayMessage])

    return (
        <div className="login-container">
            {displayMessage && <div className="message">{displayMessage}</div>}
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