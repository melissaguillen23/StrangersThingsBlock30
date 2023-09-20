import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout"
import '../assets/NavBar.css' 
import { Auth } from './Auth'

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { isLoggedin } = Auth()

    return (
        <nav>
            <Link to="/" className="title">
                Stranger's Things
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/posts">Posts</NavLink>
                </li>
                {isLoggedin && (
                    <>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </>
                )}
                {!isLoggedin && (
                  <li>
                    <NavLink to="/login">Login</NavLink>
                </li>  
                )}
            </ul>
        </nav>
    )
}
