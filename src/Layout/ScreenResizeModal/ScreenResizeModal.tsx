import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

export function ScreenResizeModal() {
    const [isVisible, setIsVisible] = useState(window.innerWidth < 1920)

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth < 1920)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (!isVisible) {
        return null
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.5 }}
                className="screen-resize-message-box">
                <div className="screen-resize-img-box">
                    <img src="/resizeModal/screen-size-1.png" alt="resize-screen-img" />
                </div>
                <div className="screen-resize-text-box">
                    <h1>Screen Size Adjustment Required</h1>
                    <p>Sorry, our page is not fully optimized for smaller screens. Please adjust your screen size to at least 1920px for the best experience.</p>

                    <p> If you need any help on how to do that, visit this  <Link to='https://www.youtube.com/watch?v=QMtpWoZ5O80&t=39s'
                        target="_blank"
                        rel="noopener noreferrer"
                    >guide.</Link><br />
                        Please use Mozzila Firefox to experience all the hover effects and animations</p>

                    <p>Thank you for understanding and happy streaming!</p>
                </div>
            </motion.div>
            <div className="overlay"></div>
        </>
    )
}