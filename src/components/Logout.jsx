import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../API/Auth'

export default function Logout() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      logout()
      navigate("/login")
    } catch (error) {
      console.error(error)
      setError("Logout Failed. Please try again.")
      }
  }

  return (
  <>
    {error && <p className="message">{error}</p>}
    <NavLink to="/logout" onClick={handleLogout}>
      Logout
    </NavLink>
    
  </>
  )
}