import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../API/ST_API";
import { useAuth } from "../API/Auth";

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth()

    const handleRegister = async (e) => {
        e.preventDefault();

        if(password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match!")
            return;
        }

        try {
            const response = await api.registerUser(username, password, passwordConfirmation);
            console.log(response);
            
        } catch (error) {
            console.error(error);
            setErrorMessage("Registration failed. Please try again.")
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
        return navigate('/')
    }
    }, [isLoggedIn, navigate]);

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Registration Form</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        value={username}
                        placeholder="username"
                        required
                    />
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        placeholder="password"
                        required
                    />
                    <label htmlFor="passwordConfirmation">Confirm password: </label>
                    <input 
                        type="password"
                        id="passwordConfirmation"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        name="passwordConfirmation"
                        value={passwordConfirmation}
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