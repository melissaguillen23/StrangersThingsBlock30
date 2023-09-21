import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../API/Auth'
import api from '../API/ST_API'

export const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await api.getPostById('token', postId)
        setPost(response.data)
      } catch (error) {
        console.error('Error fetching post details:', error)
      }
    }
    fetchPostDetails()
  }, [postId])

  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  )
}
