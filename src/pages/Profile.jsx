import React, { useEffect, useState } from "react"
import api from "../API/ST_API"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../API/Auth";

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);     
    const { isLoggedIn } = useAuth()
    const [error, setError] = useState('');

    if (!isLoggedIn) {
        navigate('/login')
        return null
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.getMyData();
                setUserData(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch user data.");
            }
        };
        fetchUserData()
    }, [])
          
    return (
        <div className="profile-container">
            <div className="profile-text">
                <h1>Welcome back {userData && userData.username}!</h1>

                {userData && userData.messages && userData.messages.length > 0 ? (
                    <div>
                        <h2>Your Messages</h2>
                        <ul>
                            {userData.messages.map((message, index) => (
                                <li key={index}>
                                    {message.content} from {message.fromUser.username} regarding {message.post.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>You have no messages.</p>
                )}

                {userData && userData.posts && userData.posts.length > 0 ? (
                    <div>
                        <h2>Your Posts</h2>
                        <ul>
                            {userData.posts.map((post, index) => (
                                <li key={index}>
                                    {post.title} - {post.description} 
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>You have no posts.</p>
                )}

                {error && <p className="error">{error}</p>}
                <button className="custom-button" onClick={() => navigate('/')}>Go Home</button>
            </div>        
        </div>
    )
}