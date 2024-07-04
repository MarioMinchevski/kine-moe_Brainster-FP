import { motion, useAnimation, useInView } from "framer-motion"
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { MediaItemThumbnail } from "../SharedComponents/MediaItemThumbnail/MediaItemThumbnail";
import { MediaSliderWrapType } from "./types";
import { asideVariantsAltThree, asideVariantsAltFour } from '../Utils/animationVariants';
import { useLocation } from "react-router-dom";

const DEFAULT_WIDTH = 450 // this dimensions calcualted for the small slider on home

export function MediaSliderWrap({ title, content, extraClass, idx, isUnique }: MediaSliderWrapType) {
    const [width, setWidth] = useState(0)
    const carousel = useRef<HTMLDivElement>(null)

    const mediaSliderWrapRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(mediaSliderWrapRef, { once: true, rootMargin: "-0px -0px -1px -0px" } as any)

    const mainControls = useAnimation()

    const location = useLocation()
    const isMoviesOrHome = location.pathname === '/movies' || location.pathname === '/home'


    useLayoutEffect(() => {
        if (carousel.current) {
            if (isUnique) {
                setWidth(DEFAULT_WIDTH);
            } else {
                setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth + 53.6);
            }
        }
    }, [carousel, content, isUnique])

    // +54.6px is because of the inner carousel gap and the carousel padding, this will be dinmaically changed later on

    // since the site is not yet responsive, the slider is also not yet responsive
    // in terms of calculating the setWidth


    // useEffect(() => {
    //     setTimeout(() => {
    //         if (carousel.current) {
    //             setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth + 53.6)
    //         }
    //     }, 500)
    // }, [carousel, content])



    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <motion.div
            ref={mediaSliderWrapRef}
            className={`media-slider-wrap ${extraClass || ''}`}
            variants={isMoviesOrHome ? (idx! % 2 === 0 ? asideVariantsAltThree : asideVariantsAltFour) : {}}
            initial={isUnique ? "visible" : "hidden"}
            animate={isMoviesOrHome ? mainControls : undefined}
        >
            <h2 className="media-slider__title">{title}</h2>
            <motion.div
                ref={carousel}
                className="carousel-media-wrap">
                <motion.div
                    drag='x'
                    whileTap={{ cursor: "grabbing" }}
                    whileHover={{ cursor: "pointer" }}
                    dragConstraints={{ right: 0, left: -width }}
                    className="media-wrap-inner-carousel">
                    {content.map((el, idx) =>
                        <motion.div key={idx}>
                            <MediaItemThumbnail {...el} extraClass={extraClass} />
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}