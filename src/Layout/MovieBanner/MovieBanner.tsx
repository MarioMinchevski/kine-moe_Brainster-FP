import { motion, useAnimation, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react";
import { slideInViewYaxisVarintsAlt } from '../Utils/animationVariants';

export function MovieBanner() {
    const homepageBennerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(homepageBennerRef, { once: true })

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])


    return (
        <motion.div
            ref={homepageBennerRef}
            variants={slideInViewYaxisVarintsAlt}
            initial="hidden"
            animate={mainControls}
            className="movie-banner">
            <div className="movie-banner__img-box">
                <img src="/banners/landing-page-banner-1.png" alt="banner-img" />
            </div>
        </motion.div>
    )
}