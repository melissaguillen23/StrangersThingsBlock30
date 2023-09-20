import React, { useEffect, useState } from 'react'

export function Auth() {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))
    const isLoggedIn = !!authToken

    useEffect(() => {

    },[authToken])

    const login = (token) => {
        setAuthToken(token)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setAuthToken(null)
        localStorage.removeItem('token')
    }

  return { isLoggedIn, authToken, login, logout }
}
