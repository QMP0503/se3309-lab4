import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setConfPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState('');//check if email is valid
    const navigate = useNavigate();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    useEffect(() => {
        passwordConfirmation();
    }, [cpassword]);

    // Regex pattern for email validation for the sake of it
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!emailRegex.test(e.target.value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const passwordConfirmation = () => {
        if (password !== cpassword) {
            setPassError('Passwords do not match');
        } else {
            setPassError('');
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors


        try {
            const response = await fetch(`/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    address,
                    phoneNumber: phone,
                    username,
                    emailAddress: email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Redirect to login or home page after successful registration
            navigate('/login');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='background'>
            <form onSubmit={handleRegister}>
                <div className='signup-panel'>
                    <h1>Sign Up</h1>

                    <div className='column-container'>

                        <div className='column'>
                            <div className='label-wrapper'>
                                <label className='login-label'>Email:</label>
                                <input
                                    type='text'
                                    className='login-input'
                                    value={email}
                                    onChange={handleEmailChange}/>
                                {emailError && <p className="error-message">{emailError}</p>}
                            </div>

                            <div className='label-wrapper'>
                                <label className='login-label'>First Name:</label>
                                <input
                                    type='text'
                                    className='login-input'
                                    value={firstName}
                                    onChange={e => setFName(e.target.value)}/>
                            </div>

                            <div className='label-wrapper'>
                                <label className='login-label'>Address:</label>
                                <input
                                    type='text'
                                    className='login-input'
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}/>
                            </div>

                            <div className='label-wrapper'>
                                <label className='login-label'>Password:</label>
                                <input
                                    type='password'
                                    className='login-input'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </div>

                        <div className='column'>
                            <div className='label-wrapper'>
                                <label className='login-label'>Username:</label>
                                <input
                                    type='text'
                                    className='login-input'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}/>
                            </div>

                            <div className='label-wrapper'>
                                <label className='login-label'>Last Name:</label>
                                <input
                                    type='text'
                                    className='login-input'
                                    value={lastName}
                                    onChange={e => setLName(e.target.value)}/>
                            </div>

                            <div className='label-wrapper'>
                                <label className='login-label'>Phone Number:</label>
                                <input
                                    type='text'
                                    className='login-input'
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}/>
                            </div>

                            <div className='label-wrapper'>
                                <label className='login-label'>Confirm Password:</label>
                                <input type='password'
                                       className='login-input'
                                       value={cpassword}
                                       onChange={e => setConfPassword(e.target.value)}/>
                                {passError && <p className="error-message">{passError}</p>}
                            </div>
                        </div>
                    </div>

                    {error && <p className='error-message'>{error}</p>}

                    <button className='login-button'>Sign up</button>

                    <p>Already have an account?</p>
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            </form>

        </div>
    )

}

export default Signup