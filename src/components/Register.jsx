import React, { useState } from "react"
import { registerUser } from "../API";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [register, setRegister] = useState({
        username: '',
        password: '',
        passwordConfirmation: '',
    });

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleChange = e => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (register.password !== register.passwordConfirmation) {
            setErrorMessage('Passwords do not match')
            return
        }

        const { success, error, data } = await registerUser({
            username: register.username,
            password: register.password,
        })

        if (success) {
            localStorage.setItem('token', data.token)
            console.log('Registration successful')
            navigate('/login')
            setRegister({
                username: '',
                password: '',
                passwordConfirmation: '',
            })
        } else {
            setErrorMessage(error || 'Registration failed')
        }
    }

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text"
                        onChange={handleChange}
                        name="username"
                        value={register.username}
                        placeholder="username"
                        required
                    />
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={register.password}
                        placeholder="password"
                        required
                    />
                    <label htmlFor="passwordConfirmation">Confirm password: </label>
                    <input 
                        type="password"
                        onChange={handleChange}
                        name="passwordConfirmation"
                        value={register.passwordConfirmation}
                        placeholder="confirm password"
                        required
                    />
                    <button type="submit">Sign Up!</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    )
}