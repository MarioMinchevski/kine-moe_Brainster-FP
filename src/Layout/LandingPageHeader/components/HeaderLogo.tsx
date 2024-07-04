import { motion } from 'framer-motion'

export function HeaderLogo() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.25, ease: "easeOut", }}
            className="header-logo">
            <img src="/landingPageHeader/kine-moe-logo.png" alt="logo" />
        </motion.div>
    )
}