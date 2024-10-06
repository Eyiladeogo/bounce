import { useState } from "react";
import dawg from '../assets/who-are-you-dawg.svg';
import api from "../utils/api";

export default function SignInModal(){
    const [email, setEmail] = useState('')
    const [userExists, setUserExists] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


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
            // Call login API here...
        } else {
            console.log('Registering with:', { email, password, firstName, lastName });
            // Call registration API here...
        }
    };

    return(
        <div className="modal">
            {/* <div>
                <img src={dawg} alt="Who are you dawg?" className="who-you"></img>
            </div> */}
            <div className="modal-container">
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
                            />
                            <button type="submit">Next</button>
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
                            />
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
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        </div>
                        <button type="submit">Register</button>
                    </>
                    )}
                    
                </form>
            </div>
            
        </div>
    )
}

