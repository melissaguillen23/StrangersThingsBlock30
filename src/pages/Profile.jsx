import React, { useEffect, useState } from "react"
import api from "../API/ST_API"
import { Link, useNavigate } from "react-router-dom"
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

    const messagesToMe = userData && userData.messages.filter(message => message.fromUser.username !== userData.username) 
    const messagesFromMe = userData && userData.messages.filter(message => message.fromUser.username === userData.username)

    return (
        <div className="profile-container">
            <div className="profile-text">
                <h1>Welcome back {userData ? userData.username : ''}!</h1>

                <h2>Messages to Me:</h2>
                {messagesToMe && messagesToMe.length > 0 ? (
                    <div className="messages-to-me">
                        {messagesToMe.map((message, index) => (
                            <div className="message-container" key={index}>
                                <h3>From: {message.fromUser.username}</h3>
                                <p>{message.content}</p>
                                {message.post ? (
                                    <p>View My Post: <Link to={`/posts/${message.post._id}`}>{message.post.title}</Link></p>
                                ) : (
                                    <p>(Deleted Post)</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You have no messages.</p>
                )}

                <h2>Messages from Me:</h2>
                {messagesFromMe && messagesFromMe.length > 0 ? (
                    <div className="messages-from-me">
                        {messagesFromMe.map((message, index) => (
                            <div className="message-container" key={index}>
                                <h3>Sent by Me</h3>
                                <p>{message.content}</p>
                                <p>Message Again: <Link to={`/posts/${message.post._id}/messages`}>Reply</Link></p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You have not sent any messages.</p>
                )}

                {error && <p className="error">{error}</p>}
                <button className="custom-button" onClick={() => navigate('/')}>Go Home</button>
             </div>
        </div>
    )
}