import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
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
                }, 2000)
            } else {
                const serverErrorMessage = response.data.error || "Login Failed: Unable to log in. Please try again."
                setError(serverErrorMessage)
                setUsername('')
                setPassword('')
                setTimeout(() => {
                    setError(null)
                }, 2000)
            } 
        } catch (error) {
            console.error(error)
            setError("Login Failed. Please try again.")
            setUsername('')
                setPassword('')
                setTimeout(() => {
                    setError(null)
                }, 2000)
        }
    }

    useEffect(() => {
        if (displayMessage) {
            const timer = setTimeout(() => {
                setDisplayMessage(null)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [displayMessage])

    return (
        <div className="form-container">
            {displayMessage && <div className="message">{displayMessage}</div>}
            <div className="form">
            <h1>Login</h1>
            {error && <p className="message">{error}</p>}
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
                 <button className="custom-button" type="submit">Log in!</button>
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