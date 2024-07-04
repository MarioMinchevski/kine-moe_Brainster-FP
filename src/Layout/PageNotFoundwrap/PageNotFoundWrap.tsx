import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function PageNotFoundWrap() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="page-not-found-wrap">
            <div className="page-not-found__img-box">
                <img src="/notFound/not-found.png" alt="page-not-found" />
            </div>
            <h1>Whoops!</h1>
            <p>Looks like you've ventured into the Bermuda Triangle of the internet. Lost pages ahead!</p>
            <Link to={'/home'} className="to-home-button">To homepage</Link>
        </motion.div>
    )
}