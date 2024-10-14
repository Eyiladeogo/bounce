import { useState } from "react";
import dawg from '../assets/who-are-you-dawg.svg';
import api from "../utils/api";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";


export default function SignInModal({ onClose }){
    const [email, setEmail] = useState('')
    const [userExists, setUserExists] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()
    // const handleEmailSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await api.post('/api/check-email', {email});
    //         if (response.status === 200){
    //             setUserExists(true)
    //         } else if (response.status === 404){
    //             setUserExists(false)
    //         } else{
    //             setErrorMessage('An unexpected error occured')
    //         }    
    //     }
    //     catch (error){
    //         console.error('Error checking email', error)
    //         console.error('Error checking email', error)
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if (userExists){
    //         console.log('Log in')
    //     }
    //     else{
    //         console.log('Registering')
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email is being submitted first
        if (userExists === null) {
            try {
                const response = await api.post('/api/check-email', {"email": email });
                const message = response.data["message"]
                if (message.split(" ")[0] === "Exists") {
                    setUserExists(true); // Email found, move to login
                } else if (message === "Does not exist") {
                    setUserExists(false); // Email not found, move to register
                } else {
                    setErrorMessage('An unexpected error occurred');
                }
            } catch (error) {
                console.error('Error checking email', error);
                setErrorMessage('Server error occurred');
            }
            return; // Early return to prevent form submission after email check
        }

        // Handle Login or Register based on userExists
        if (userExists) {
            console.log('Logging in with:', { email, password });
            try {
                const response = await api.post('/user/login/', {"email":email, "password":password})
                const token = response.data['token']
                localStorage.setItem('token', token);
                dispatch(login(token))
            } catch (error) {
                console.error('Login failed', error)
                setErrorMessage('Error logging in')
            }
            // Call login API here...
        } else {
            console.log('Registering with:', { email, password, firstName, lastName });
            try {
                const response = await api.post('/user/register/', {"email":email, "password":password, "first_name":firstName, "last_name":lastName, "password2":confirmPassword})
                const token = response.data['token']
                localStorage.setItem('token', token);
            } catch (error) {
                console.error('Registration failed', error)
                setErrorMessage('Error during registration')
                
            }
            // Call registration API here...
        }
    };

    return(
        <div className="modal">
            {/* <div>
                <img src={dawg} alt="Who are you dawg?" className="who-you"></img>
            </div> */}
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={dawg} alt="Who are you dawg?" className="who-you"></img>
                <form onSubmit={handleSubmit}>
                    <h2>{userExists === null ? 'Sign In' : userExists ? 'Login' : 'Register'}</h2>

                    {errorMessage && <p className="error">{errorMessage}</p>}

                    {userExists === null && (
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                            <p className="help-text">
                                We'll check if you already have an account with this email
                            </p>
                            <button type="submit" className="submit-button">Next</button>
                        </div>
                    )}
                    

                    {userExists === true && (
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                            <p className="help-text">
                                Please enter your password to log in.
                            </p>
                            <button type="submit">Login</button>
                        </div>
                    )}
                    
                    {userExists === false && (
                    <>
                        <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="Enter your first name"
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            placeholder="Enter your last name"
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a password"
                        />
                            <p className="help-text">
                                Choose a strong password for your account.
                            </p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                            <p className="help-text">
                                Please re-enter your password to confirm.
                            </p>
                        </div>
                        <button type="submit">Register</button>
                    </>
                    )}
                    
                </form>
            </div>
            
        </div>
    )
}

