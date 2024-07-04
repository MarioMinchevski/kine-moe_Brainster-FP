import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../SharedTypes/SharedTypes";
import { fetchUsers } from "../../utils/fetchUsers";
import { signInWithGooglePopup } from "../../libs/firebase";

export function SignUpFormBox() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const [wrongCredentials, setWrongCredentials] = useState<boolean>(false)
    const [validationMessage, setValidationMessage] = useState<string>('')

    const { data: users, isLoading, error } = useQuery<UserType[]>({
        queryFn: fetchUsers,
        queryKey: ['users']
    })

    const handleSignUp = (event: React.FormEvent) => {
        event.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0) {
            setValidationMessage('Please fill both email and password.')
            setWrongCredentials(true)
            return
        }

        if (isLoading) {
            console.log('Loading users, please wait...')
            return
        }

        if (error) {
            console.log('An error occurred while fetching users.')
            return
        }
        const lowerCaseEmail = email.toLowerCase()
        const user = users?.find(user => user.email.toLowerCase() === lowerCaseEmail)

        if (user) {
            setWrongCredentials(true)
            setValidationMessage('Email already in use, please use a different email')
        } else {
            setWrongCredentials(false)
            navigate('/create-account', { state: { email, password } })
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

            const user = users?.find(user => user.email === email)

            if (user) {
                setWrongCredentials(true)
                setValidationMessage('Email already in use, please use a different email')
            } else {
                setWrongCredentials(false)
                navigate('/create-account', { state: { email } })
            }
        } catch (error) {
            console.log('An error occurred during Google sign-in:', error)
        }
    }

    return (
        <div className="sign-up-form-box">
            <h1 className="sign-up-title">Create your account!</h1>
            <div className="sign-up-form-inner-wrap__socials">
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
                <button className="socials-btn">
                    <img src="/signInSignUp/apple-icon.png" alt="apple-icon" />
                    <span>Sign up with Apple</span>
                </button>
            </div>
            <div className="separator">or</div>
            <div className="sign-up-form-inner-wrap">
                <form className="sign-up-form" onSubmit={handleSignUp}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="sign-up-email"
                            id="sign-up-email"
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
                            name="sign-up-password"
                            id="sign-up-password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="message"></div>
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <Link to='/sign-in' className="back-to-login">Back to log in</Link>
            </div>
            <p
                className={`incorrect-creditentials-message ${wrongCredentials ? 'show' : ''}`}
                dangerouslySetInnerHTML={{ __html: validationMessage }}
            />
        </div>
    );
}
