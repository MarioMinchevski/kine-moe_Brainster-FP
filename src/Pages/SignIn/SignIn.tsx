import { SignInSignUpMediaBox } from "../../Layout/SharedComponents/SignInSignUpMediaBox/SignInSignUpMediaBox"
import { SignInFormBox } from "../../Layout/SignIn/SignInFormBox"
import { motion } from "framer-motion";
export function SignIn() {
    return (
        <div className="sign-in">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="sign-in-wrap">
                <SignInSignUpMediaBox />
                <SignInFormBox />
            </motion.div>
        </div>
    )
}