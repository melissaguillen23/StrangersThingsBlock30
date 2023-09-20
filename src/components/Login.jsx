import React, { useState } from "react"
import { loginUser } from "../API";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import '../assets/Auth.css'

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials({
            ...credentials,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await loginUser(
                credentials.username,
                credentials.password
            )

            if (response.success) {
                navigate("/profile")
            } else {
                setError("Incorrect username or password")
            }
        } catch (error) {
            console.error(error)
            setError("An error occurred")
            }
    }

    return (
        <div className="login-container">
            <div className="login-form">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
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
                        value={credentials.password}
                        onChange={handleChange}
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