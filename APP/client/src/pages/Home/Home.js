import React, {useEffect, useState} from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

function Home(){
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [username , setUsername] = useState("");

    useEffect(() => {
        if(user) {
            setUsername(user.username);
        }
    }, []);

    return (
    <div className='background-wrapper'>
        <div className='title-splash'>
          <h1 className='home-title'>Family Jewels</h1>
          <Link to="/products" className='home-link-fix'>
            <button className='home-button'>View Products</button>
          </Link>
        </div>
        {!username &&
            <div className='enter-site'>
                <Link to="/login" className='home-link-fix'>
                    <button className='home-button'>Login</button>
                </Link>
                <Link to="/signup" className='home-link-fix'>
                    <button className='home-button'>Sign Up</button>
                </Link>
            </div>
        }
        {username &&
            <div className='enter-site'>
                <Link to="/profile">Your Orders</Link>
            </div>
        }

    </div>
    )
}

export default Home