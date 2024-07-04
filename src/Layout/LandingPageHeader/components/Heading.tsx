import { motion } from 'framer-motion'

export function Heading() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.55, ease: "easeOut", }}
            className="heading-text-box">
            <h1>EXPLORE, ENGAGE & EXPRESS YOURSELF</h1>
            <h2>Watch, learn, collaborate beyond the screen</h2>
        </motion.div>
    )
}