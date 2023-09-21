import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../API/Auth";
import api from '../API/ST_API'


export default function UpdatePost() {
    const { isLoggedIn } = useAuth()
    const { postId } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    if (!isLoggedIn) {
        return navigate('/login')
    }

    const handleDeletePost = async () => {
        if(window.confirm("Are you sure you want to delete this post?")) {
           try {
            const response = await api.deletePost('token', postId)
            console.log(response)
            navigate('/post')
            } catch (error) {
                console.error('Error deleting post:', error)
                setError('Error deleting the post. Please try again.')
            } 
        }
        
    }

    return (
        <div>
            <h1>Delete Post</h1>
            {error && <p className="error">{error}</p>}
            <button onClick={handleDeletePost}>Delete Post</button>
        </div>
    )
}