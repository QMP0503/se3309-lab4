import React, { useEffect, useState } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    return (
        <nav className="nav">
            <Link to="/" className="title">
                Family Jewels
            </Link>
            <ul>
                <CustomLink to="/products">Products</CustomLink>
                <CustomLink to="/createproduct">Create</CustomLink>
                <CustomLink to="/cart">Cart</CustomLink>
            </ul>
            {!username &&
            <ul>
                <CustomLink to="/login">Login</CustomLink>
                <CustomLink to="/register">Sign Up</CustomLink>
            </ul>
            }
            {username &&
            <ul>
                <h4 style={{marginRight: 20}}>User: {username}</h4>
                <button onClick={logout} className='logout-button'>Logout</button>
            </ul>
            }
        </nav>
    )

    function logout() {
        localStorage.removeItem("username");
        setUsername("");
      }
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

export default Navbar