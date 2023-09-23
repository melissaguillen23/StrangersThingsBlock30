import React, { useEffect, useState } from 'react'
import api from '../API/ST_API'
import { useAuth } from '../API/Auth'
import { useNavigate, useParams } from 'react-router-dom'

export default function PostDetails() {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const { postId } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
      const fetchPostDetails = async () => {
        try {
          const response = await api.getPosts()
          const specificPost = response.data.posts.find(p => p._id === postId)
            setPost(specificPost)
        } catch (error) {
          console.error("Error fetching post details:", error)
        }
      }

      fetchPostDetails()
    }, [postId])

    const handleDelete = async () => {
      try {
        await api.deletePost(post._id)
        navigate('/posts')
      } catch (error) {
        console.error("Error deleting post:", error)
      }
   }

    if (!post) {
        return <div>Loading...</div>
    }

  return (
    <div className='post-detail-container'>
      <div className='post-detail'>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {post.isAuthor && isLoggedIn && (
        <>
        <button className='custom-button' onClick={() => navigate(`/update-post/${post._id}`)}>Edit</button>
        <button className='custom-button' onClick={handleDelete}>Delete</button>
        </>
      )}
      <div>
        <h3>Messages regarding this post:</h3>
      </div>
      </div>
    </div>
  )
}