import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API/ST_API";


export default function UpdatePost() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [displayMessage, setDisplayMessage] = useState('')
    const [updatePostInfo, setUpdatePostInfo] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        willDeliver: false,
    })

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await api.getPosts()
                const specificPost = response.data.posts.find(p => p._id === postId)
                    setPost(specificPost)
                    setUpdatePostInfo(specificPost)
            } catch (error) {
                console.error('Error fetching post details:', error)
            }
        }
        
        fetchPostDetails()
    }, [postId])

    const handleUpdatePost = async (e) => {
        e.preventDefault()

        try {
            await api.updatePost(postId, updatePostInfo)
            setDisplayMessage('Post successfully updated!')
            setTimeout(() => {
                setDisplayMessage('')
            }, 3000)
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value

        setUpdatePostInfo({
            ...updatePostInfo,
            [name]: newValue,
        })
    }

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="form-container">
            {displayMessage && <div className="message">{displayMessage}</div>}
            <div className="form">
            <h1>Update Post</h1>
            <form onSubmit={handleUpdatePost}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        value={updatePostInfo.title}
                        onChange={handleInputChange}
                        required 
                        />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description"
                        name="description"
                        value={updatePostInfo.description}
                        onChange={handleInputChange}
                        required 
                        />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="text"
                        id="price"
                        name="price"
                        value={updatePostInfo.price}
                        onChange={handleInputChange}
                        required 
                        />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input 
                        type="text"
                        id="location"
                        name="location"
                        value={updatePostInfo.location}
                        onChange={handleInputChange}
                        required 
                        />
                </div>
                <div className="form-checkbox">
                    <label htmlFor="willDeliver">Will Deliver:</label>
                    <input 
                        type="checkbox"
                        id="willDeliver"
                        name="willDeliver"
                        checked={updatePostInfo.willDeliver}
                        onChange={handleInputChange}
                        />
                </div>
                <button className='custom-button' type="submit">Update Post</button>
                <button className='custom-button' onClick={() => navigate(-1)}>Back</button>

            </form>
            </div>    
        </div>
    )
}
