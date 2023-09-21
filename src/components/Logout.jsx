import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../API/Auth'

export default function Logout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('userToken');
    navigate('/login')
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

