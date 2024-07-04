import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function SignInBtn() {
    return (
        <Link to={'/sign-in'}>
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.85, ease: "easeOut", }}
                className="sign-in-sign-up-button">
                Sign up/Log in
            </motion.button>
        </Link>
    )
}