import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErr] = useState("");

  return (
    <div className='background'>
        <div className='login-panel'>
            <h1>Login</h1>


            <div className='input-wrapper'>
                <div className='label-wrapper'>
                    <label className='login-label'>Username:</label>
                    <input type='text' className='login-input' onChange={e => setUsername(e.target.value)}/>
                </div>

                <div className='label-wrapper'>
                    <label className='login-label'>Password:</label>
                    <input type='password' className='login-input' onChange={e => setPassword(e.target.value)}/>
                </div>

                {errMsg && <p className='error-message'>{errMsg}</p>}

                <button className='login-button' onClick={login}>Login</button>
            </div>

      
            <p>Don't have an account?</p>
            <Link to="/register">
                Sign up
            </Link>

        </div>
    </div>
  )

  function login() {
    //API CALLING HERE
    //Check if username + password match database
    console.log(username)
    console.log(password)
  
    setErr("*Yes");
    
    //use localstorage for authentication (kinda sucks but dont wanna use jwt)
    localStorage.setItem("username", username)
  }
}
export default Login