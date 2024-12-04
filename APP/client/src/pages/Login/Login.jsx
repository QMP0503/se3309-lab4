import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./Login.css";
const host = `http://${window.location.hostname}:5000`;


function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // For redirecting

    const authenticate = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors

        if(!username || !password) {
            setError("Please enter a valid username and password");
            return;
        }

        try {
            const response = await fetch(`${host}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Store token in session storage
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to home page
            navigate("/");
            window.location.reload();

            console.log(data.message);
            console.log(sessionStorage.getItem("user"));

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='background'>
            <div className='login-panel'>
                <form onSubmit={authenticate}>
                    <h1>Login</h1>

                    <div className='input-wrapper'>
                        <div className='label-wrapper'>
                            <label className='login-label'>Username:</label>
                            <input
                                type='text'
                                className='login-input'
                                value={username}
                                onChange={(e )=> setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className='label-wrapper'>
                            <label className='login-label'>Password:</label>
                            <input
                                type='password'
                                className='login-input'
                                value={password}
                                onChange={(e )=> setPassword(e.target.value)}/>
                        </div>

                        {error && <p className='error-message'>{error}</p>}

                        <button type="submit" className='login-button'>Login</button>
                    </div>
                </form>

                <p>Don't have an account?</p>
                <Link to="/register">
                    Sign up
                </Link>

            </div>
        </div>
    )

}
export default Login