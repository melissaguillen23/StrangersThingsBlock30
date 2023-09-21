import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
    const login = (token) => {
        setIsLoggedIn(true)
        localStorage.setItem("userToken", token)
        localStorage.setItem("isLoggedIn", "true")
    }
    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("userToken")
        localStorage.removeItem("isLoggedIn")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function isAuthenticated() {
    const token = localStorage.getItem('userToken')
    return token && token.length > 10
}