import React, { useEffect, useState } from 'react'
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
  const [error, setError] = useState('')

    if (!isLoggedIn) {
        navigate('/login')
        return null
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        const response = await api.createPost(postDetails);
        console.log(response)
      } catch (error) {
        console.error('Error creating post:', error);
        setError("Failed to create post.")
      }
    }

    useEffect(() => {
      fetchCreatePost();
    }, []);

  return (
    <div>
      <h1>Create Post</h1>
        {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
                <input 
                  type="text"
                  id="title"
                  name="title"
                  placeholder='Post Title'
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
                  placeholder='Description'
                  value={postDetails.description}
                  onChange={e => setPostDetails({...postDetails, description: e.target.value})}
                  required 
                />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
                <input 
                  type="text"
                  id="price"
                  name="price"
                  placeholder='Price'
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
                  placeholder='Location'
                  value={postDetails.location}
                  onChange={e => setPostDetails({...postDetails, location: e.target.value})}
                  required 
                />
            </div>
            <div>
              <label htmlFor="willDeliver">Will Deliver:</label>
                <input 
                  type="checkbox"
                  id="willDeliver"
                  name="willDeliver"
                  checked={postDetails.willDeliver}
                  value={postDetails.willDeliver}
                  onChange={e => setPostDetails({...postDetails, willDeliver: e.target.checked})}
                  required 
                />
            </div>
                <button type="submit">Create Post</button>
            </form>
    </div>    
  )
}
