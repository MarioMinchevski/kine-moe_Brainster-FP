import { CreateAccForm } from "../../Layout/CreateAccount/CreateAccForm";
import { motion } from "framer-motion";
export function CreateAccountForm() {
    return (
        <div className="create-account">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="create-account-wrap">
                <CreateAccForm />
            </motion.div>
        </div>
    )
}