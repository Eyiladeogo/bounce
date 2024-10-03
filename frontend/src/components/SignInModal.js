import { useState } from "react";
import dawg from '../assets/who-are-you-dawg.svg';

export default function SignInModal(){
    const [email, setEmail] = useState('')
    const [userExists, setUserExists] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/check-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
            if (response.status === 200){
                setUserExists(true)
            } else if (response.status === 404){
                setUserExists(false)
            } else{
                setErrorMessage('An unexpected error occured')
            }    
        }
        catch (error){
            console.error('Error checking email', error)
            console.error('Error checking email', error)
        }
    }

    const handleSubmit = () => {
        e.preventDefault()
        if (userExists){
            console.log('Log in')
        }
        else{
            console.log('Registering')
        }
    }

    return(
        <div className="modal">
            <div>
                <img src={dawg}></img>
            </div>
            <form>
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
                            type="passeord"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button onClick={handleSubmit}>Login</button>
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
                    <button onClick={handleSubmit}>Register</button>
                </>
                )}
                
            </form>
        </div>
    )
}

