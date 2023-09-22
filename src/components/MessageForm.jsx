import React, { useState } from 'react'
import api from '../API/ST_API'
import { useLocation } from 'react-router-dom'

export default function MessageForm() {
  const [message, setMessage] = useState('')
  const location = useLocation()
  const post = location.state.post

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.sendMessage(post._id, message)
      setMessage('')
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className='message-form-container'>
      <div className='message-post-details' >
        <h2>Post Details</h2>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p>Price: ${post.price}</p>
        <p>Seller: {post.author.username}</p>
      </div>
      <div className='message-form' >
      <h3>Message {post.author.username} about this post: </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          id='description'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Write your message here...'
          />
      </form>
      <button className="custom-button" type='submit'>Send Message</button>
      </div>
    </div>
  )
}
