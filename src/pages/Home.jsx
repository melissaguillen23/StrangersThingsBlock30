import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../API/ST_API"
import { useAuth } from "../API/Auth"

export default function Home() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserData = async () => {
                try {
                    const response = await api.getMyData()
                    setUserData(response.data)
                } catch (error) {
                    console.error("Failed to fetnch use data", error)
                }
            }
            fetchUserData()
        }
    }, [isLoggedIn])

    const handleViewProfile = () => {
        navigate('/profile')
    }
    
    return (
        <div className="home-container">
                <h1>Welcome to Stranger's Things</h1>
                <h2>Logged in as: {userData && userData.username ? userData.username : "Guest"}</h2>
                { isLoggedIn && <button className="custom-button" onClick={handleViewProfile}>View Profile</button> }
                { !isLoggedIn && <button className="custom-button" onClick={() => navigate('/login')}>Go to Login page</button> }
        </div>
    )
}