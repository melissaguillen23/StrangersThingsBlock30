import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../assets/Pages.css'
import api from "../API/ST_API"
import { useAuth } from "../API/Auth"

export default function Home() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.getMyData()
                setUserData(response.data)
            } catch (error) {
                console.error("Failed to fetnch use data", error)
            }
        }
        fetchUserData()
    }, [])

    const handleViewProfile = () => {
        navigate('/profile')
    }
    
    return (
        <div className="home-container">
           <div className="home-text">
                <h1>Welcome to Stranger's Things</h1>
                <h2>Welcome, {userData && userData.username ? userData.username : "Guest"}</h2>
                { isLoggedIn && <button onClick={handleViewProfile}>View Profile</button> }
                { !isLoggedIn && <button onClick={() => navigate('/login')}>Go to Login page</button> }
           </div>
        </div>
    )
}