import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../API/Auth'
import '../assets/Auth.css'

export default function Logout() {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      logout()
      navigate("/login", { state: { message: "Success: Successfully logged out." } })
    } catch (error) {
      console.error(error)
      setError("Logout Failed. Please try again.")
      setMessage("Failed: Unable to log out.")
      }
  }


  return (
  <div className="logout-container">
    {error && <p className="error">{error}</p>}
    {message && <p className="message">{message}</p> }
    <button className='logout-button' onClick={handleLogout}>Logout</button>
  </div>
  )
}
 


