import { motion, useAnimation, useInView } from "framer-motion"
import { useRef, useEffect } from "react";
import { HomeMovieBannerType } from "./types";
import { asideVariantsAltThree } from '../Utils/animationVariants';

export function HomeMovieBanner({ img, title }: HomeMovieBannerType) {
    const homeMovieBannerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(homeMovieBannerRef, { once: true })

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <motion.div
            ref={homeMovieBannerRef}
            variants={asideVariantsAltThree}
            initial="hidden"
            animate={mainControls}
            className="home-movie-banner">
            {title && <h2 className="home-movie-banner__title">{title}</h2>}
            <img src={img} alt={img} />
        </motion.div>
    )
}