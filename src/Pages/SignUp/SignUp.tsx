import { SignInSignUpMediaBox } from "../../Layout/SharedComponents/SignInSignUpMediaBox/SignInSignUpMediaBox";
import { SignUpFormBox } from "../../Layout/SignUp/SignUpFormBox";
import { motion } from "framer-motion";
export function SignUp() {
    return (
        <div className="sign-up">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="sign-up-wrap">
                <SignInSignUpMediaBox />
                <SignUpFormBox />
            </motion.div>
        </div>
    )
}