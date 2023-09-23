import React, { useState } from 'react'
import api from '../API/ST_API';
import { useAuth } from '../API/Auth';
import { useNavigate } from 'react-router-dom';

export default function CreatePostForm() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [postDetails, setPostDetails] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    willDeliver: false
  })
  const [message, setMessage] = useState('')

    if (!isLoggedIn) {
        navigate('/login')
        return null
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        const response = await api.createPost(postDetails);
        console.log(response)
        setMessage("Post created successfully!")
        setTimeout(() => {
          setMessage('')
          navigate('/posts')
        }, 1000)
      } catch (error) {
        console.error('Error creating post:', error);
        setMessage("Failed to create post.")
      }
    }

  return (
    <div className='post-form-container'>
      <div className='post-form'>
      <h1>Create Post</h1>
      {message && <p className='message'>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
                <input 
                  type="text"
                  id="title"
                  name="title"
                  value={postDetails.title}
                  onChange={e => setPostDetails({...postDetails, title: e.target.value})}
                  required 
                />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
                <textarea 
                  id="description"
                  name="description"
                  value={postDetails.description}
                  onChange={e => setPostDetails({...postDetails, description: e.target.value})}
                  required 
                />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
                <input 
                  type="number"
                  id="price"
                  name="price"
                  value={postDetails.price}
                  onChange={e => setPostDetails({...postDetails, price: e.target.value})}
                  required 
                />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
                <input 
                  type="text"
                  id="location"
                  name="location"
                  value={postDetails.location}
                  onChange={e => setPostDetails({...postDetails, location: e.target.value})}
                  required 
                />
            </div>
            <div className='post-form-checkbox'>
              <label htmlFor="willDeliver">Will Deliver:</label>
                <input 
                  type="checkbox"
                  id="willDeliver"
                  name="willDeliver"
                  checked={postDetails.willDeliver}
                  value={postDetails.willDeliver}
                  onChange={e => setPostDetails({...postDetails, willDeliver: e.target.checked})}
                />
            </div> 
            <button className="custom-button" type="submit">Create Post</button>
            </form>
            
      </div>
    </div>    
  )
}
