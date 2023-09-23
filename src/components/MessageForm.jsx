import React, { useState } from 'react'
import api from '../API/ST_API'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../API/Auth'

export default function MessageForm() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    navigate('login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.sendMessage(postId, message)
      navigate(`/posts/${postId}`)
    } catch (error) {
      console.error(error)
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <div className='message-form-container'>
        <h2>Send a Message</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
        <textarea
          id='description'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Write your message here...'
          />
          <button className="custom-button" type='submit'>Send Message</button>
      </form>
      
    </div>
  )
}
