import React from "react"
import { useNavigate } from "react-router-dom"
import { Auth } from '../components/Auth'
import '../assets/Pages.css'

export default function Home() {
    const navigate = useNavigate()
    const { isLoggedIn, authToken } = Auth()

    const handleViewProfile = () => {
        navigate('/profile')
    }

    return (
        <div className="home-container">
           <div className="home-text">
                <h1>Welcome to Stranger's Things</h1>
                <h2>Logged in as {isLoggedIn ? authToken.username : 'Guest'}</h2>
                <button onClick={handleViewProfile}>View Profile</button>
           </div>
        </div>
    )
}