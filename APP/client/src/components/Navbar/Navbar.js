import React, { useEffect, useState } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'

function Navbar () {
    const [username, setUsername] = useState("");

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

    function logout() {
        localStorage.removeItem("user");
        setUsername("");
    }

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if(user) {
            setUsername(user.username);
        }

        console.log(user);

    }, []);

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
                <CustomLink to="/profile">View Orders</CustomLink>
                <h4 style={{marginRight: 20}}>User: {username}</h4>
                <button onClick={logout} className='logout-button'>Logout</button>
            </ul>
            }
        </nav>
    )


}



export default Navbar