import { Link, useNavigate } from "react-router-dom";
import { useUserLoggedInContext } from "../../Context/UserLoggedInContext";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../SharedTypes/SharedTypes";
import { fetchUsers } from "../../utils/fetchUsers";
import { useState } from "react";
import { signInWithGooglePopup } from "../../libs/firebase";

export function SignInFormBox() {
    const { logUserIn } = useUserLoggedInContext()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const [wrongCredentials, isWrongCredentials] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')

    const { data: users, isLoading, error } = useQuery<UserType[]>({
        queryFn: fetchUsers,
        queryKey: ['users']
    })

    const handleLogIn = (event: React.FormEvent) => {
        event.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0) {
            setValidationMessage('Please fill both username and password.')
            isWrongCredentials(true)
            return
        }

        if (isLoading) {
            alert('Loading users, please wait...')
            return
        }

        if (error) {
            alert('An error occurred while fetching users.')
            return
        }

        const lowerCaseEmail = email.toLowerCase()
        const user = users?.find(user => user.email.toLowerCase() === lowerCaseEmail && user.password.toString() === password.toString())

        if (user) {
            isWrongCredentials(false)

            localStorage.setItem('user', JSON.stringify(user))
            logUserIn()

            setPassword('')
            setEmail('')

            navigate('/home')
        } else {
            isWrongCredentials(true)
            setValidationMessage('Oops! Wrong email or password.<br /> Give it another go.')
        }
    }

    // sign up with google, i made that it will ONLY take your email and not password

    const handleSignUpWithGoogle = async () => {
        try {
            const res = await signInWithGooglePopup()
            const email = res.user.email

            if (!email) {
                console.log('No email found in response.')
                return
            }

            const lowerCaseEmail = email.toLowerCase()
            const user = users?.find(user => user.email.toLowerCase() === lowerCaseEmail)

            if (user) {
                isWrongCredentials(true)
                setValidationMessage('Email already in use, please use a different email')
            } else {
                isWrongCredentials(false)
                navigate('/create-account', { state: { email } })
            }
        } catch (error) {
            console.log('An error occurred during Google sign-in:', error)
        }
    }

    return (
        <div className="sign-in-form-box">
            <div className="sign-in-form-inner-wrap">
                <h1 className="sign-in-title">Welcome!</h1>
                <h2 className="sign-in-sub-title">Join us!</h2>
                <form action="" className="sign-in-form" onSubmit={handleLogIn}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="sign-in-email"
                            id="sign-in-email"
                            className="form-control"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="message"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="sign-in-password"
                            id="sign-in-password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="message"></div>
                    </div>
                    <button type="submit" className="log-in-btn">Log In</button>
                </form>
            </div>
            <div className="separator">or</div>
            <div className="sign-in-form-inner-wrap__socials">
                <button
                    onClick={handleSignUpWithGoogle}
                    className="socials-btn">
                    <img src="/signInSignUp/google-icon.png" alt="google-icon" />
                    <span>Sign up with Google</span>
                </button>
                <button className="socials-btn">
                    <img src="/signInSignUp/facebook-icon.png" alt="facebook-icon" />
                    <span>Sign up with Facebook</span>
                </button>
            </div>
            <Link to='/sign-up' className="create-new-acc">Create a new account</Link>
            <p
                className={`incorrect-creditentials-message ${wrongCredentials ? 'show' : ''}`}
                dangerouslySetInnerHTML={{ __html: validationMessage }}
            />
        </div>
    )
}