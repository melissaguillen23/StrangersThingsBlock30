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
    <>
    <div className='post-container'>
      <div className='post-card'>
        <h2>{post.title}</h2>
        <p>Description: {post.description}</p>
        <h3>Price: ${post.price}</h3>
        <p>Location: {post.location}</p>
      </div>

      <div className="post-vertical-divider"></div>

      {isLoggedIn && post.isAuthor && (
        <div className="post-messages">
          <h2>Messages regarding this post:</h2>
          {post.messages && post.messages.length > 0 ? (
            post.messages.map((message, index) => (
              <div key={index}>
                <p><strong>From:</strong>{message.senderName}</p>
                <p>{message.content}</p>
              </div>
            ))
          ) : (
            <p>No messages for this post yet.</p>
          )}
        </div>
      )}
    </div>

    <div className='post-buttons'>
    {post.isAuthor && isLoggedIn && (
      <>
        <button className="custom-button" onClick={() => navigate(`/update-post/${post._id}`)}>Edit</button>
        <button className="custom-button" onClick={handleDelete}>Delete</button>
        <button className="custom-button" onClick={() => navigate(-1)}>Back</button>
      </>
    )}
    </div>
</>
  )
}