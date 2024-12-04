import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfPassword] = useState("");
  const [errMsg, setErr] = useState("");

  return (
    <div className='background'>
        <div className='signup-panel'>
            <h1>Sign Up</h1>

            <div className='column-container'>

              <div className='column'>
                  <div className='label-wrapper'>
                      <label className='login-label'>Email:</label>
                      <input type='text' className='login-input' onChange={e => setEmail(e.target.value)}/>
                  </div>

                  <div className='label-wrapper'>
                      <label className='login-label'>First Name:</label>
                      <input type='text' className='login-input' onChange={e => setFName(e.target.value)}/>
                  </div>

                  <div className='label-wrapper'>
                      <label className='login-label'>Address:</label>
                      <input type='text' className='login-input' onChange={e => setAddress(e.target.value)}/>
                  </div>

                  <div className='label-wrapper'>
                      <label className='login-label'>Password:</label>
                      <input type='password' className='login-input' onChange={e => setPassword(e.target.value)}/>
                  </div>
              </div>

              <div className='column'>
                <div className='label-wrapper'>
                    <label className='login-label'>Username:</label>
                    <input type='text' className='login-input' onChange={e => setUsername(e.target.value)}/>
                </div>

                <div className='label-wrapper'>
                    <label className='login-label'>Last Name:</label>
                    <input type='text' className='login-input' onChange={e => setLName(e.target.value)}/>
                </div>

                <div className='label-wrapper'>
                    <label className='login-label'>Phone Number:</label>
                    <input type='text' className='login-input' onChange={e => setPhone(e.target.value)}/>
                </div>

                <div className='label-wrapper'>
                    <label className='login-label'>Confirm Password:</label>
                    <input type='password' className='login-input' onChange={e => setConfPassword(e.target.value)}/>
                </div>
              </div>
            </div>

            {errMsg && <p className='error-message'>{errMsg}</p>}

            <button className='login-button' onClick={signUp}>Sign up</button>

            <p>Already have an account?</p>
            <Link to="/login">
                Login
            </Link>
        </div>
    </div>
  )

  function signUp() {
    //API CALLING HERE using usestate variables
    setErr("*Success or Error");
  }
}

export default Signup