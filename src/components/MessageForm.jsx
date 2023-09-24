import React, { useEffect, useState } from 'react'
import api from '../API/ST_API'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../API/Auth'

export default function MessageForm() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const { isLoggedIn } = useAuth()
  const [displayMessage, setDisplayMessage] = useState('')


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

  if (!isLoggedIn) {
    navigate('login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.sendMessage(postId, message)
      setDisplayMessage('Message sent!')
            setTimeout(() => {
              setDisplayMessage('')
              navigate('/posts')
            }, 3000)
    } catch (error) {
      console.error(error)
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <>
     <div className='post-container'>
     {displayMessage && <div className="message">{displayMessage}</div>}
      {post && (
        <div className='post-card'>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>Price: {post.price}</p>
          <p>Seller: {post.username}</p>
          <p>Location: {post.location} </p>
        </div>
      )}
     </div>
      <div className='form-container'>
        <div className='form'>
          <h2>Send a Message</h2>
            {error && <p className='message'>{error}</p>}
            <form onSubmit={handleSubmit}>
              <textarea
                id='description'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Write your message here...'
                />
                <div>
                  <button className="custom-button" type='submit'>Send Message</button>
                  <button className='custom-button' onClick={() => navigate(-1)}>Back</button>
                </div>
            </form>
      </div>
    </div>
    </>
  )
}
