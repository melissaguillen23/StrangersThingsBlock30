import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../API/Auth";
import api from "../API/ST_API";


export default function UpdatePost() {
    const { isLoggedIn } = useAuth()
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')
    const [updatePostInfo, setUpdatePostInfo] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        willDeliver: false,
    })

    if (!isLoggedIn) {
        return navigate('/login')
    }

    const fetchPostDetails = async () => {
        try {
            const response = await api.getPostById('token', postId)
            setPost(response.data)
            setUpdatePostInfo(response.data)
        } catch (error) {
            console.error('Error fetching post details:', error)
            setError("Failed to fetch post details.")
        }
    }

    useEffect(() => {
        fetchPostDetails()
    }, [postId])

    const handleUpdatePost = async (e) => {
        e.preventDefault()

        try {
            const response = await api.updatePost('token', postId, updatePostInfo)
            console.log('Post updated:', response)
            navigate(`/post/${postId}`)
        } catch (error) {
            console.error('Error updating post:', error)
            setError("Failed to update post.")
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
        <div>
            <h1>Update Post</h1>
            {error && <p className="error">{error}</p>}
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
                <div>
                    <label htmlFor="willDeliver">Will Deliver:</label>
                    <input 
                        type="checkbox"
                        id="willDeliver"
                        name="willDeliver"
                        checked={updatePostInfo.willDeliver}
                        value={updatePostInfo.willDeliver}
                        onChange={handleInputChange}
                        required 
                        />
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    )
}
