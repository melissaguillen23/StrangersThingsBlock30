import React, { useEffect, useState } from "react"
import { myData } from "../API"
import { Link } from "react-router-dom"

export default function Profile() {
    const [profileData, setProfileData] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        async function fetchProfileData() {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error("User is not authenticated.")
                    setAuthenticated(false)
                    return
                }

                const response = await myData(token)
                if(response.success) {
                    setProfileData(response.data)
                    setAuthenticated(true)
                } else {
                    console.error("Failed to fetch user profile")
                }
            } catch (error) {
                console.error("Error fetching user profile.", error)
            }
        }
        fetchProfileData()
    }, [])


    return (
        <div>
           {authenticated ? (
                profileData ? (
                    <div>
                        <h1>User Profile</h1>
                        <p>Username: {profileData.username}</p>
                    </div>        
                ) : (
                <p>Loading profile data...</p>
                ) 
            ) : (
                <div>
                    <p>Please log in to view your profile.</p>   
                    <span>
                        <Link to="/Login">Click here to log in!</Link>
                    </span>
                </div>
                )
            }
        </div>
    )
}