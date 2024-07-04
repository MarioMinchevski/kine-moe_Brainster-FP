import { useEffect, useRef } from "react";
import { StreamingLibraryItem } from "./components/StreamingLibraryItem";
import { motion, useAnimation, useInView } from 'framer-motion'
import { slideInViewYaxisVarints } from '../Utils/animationVariants';

const streamingLibraryConfig = [
    {
        streamingItemName: 'Movie Room',
        streamingItemImage: '/streamingLibrary/movies-room.png',
        linkTo: '/sign-in'
    },
    {
        streamingItemName: 'Kids Room',
        streamingItemImage: '/streamingLibrary/kids-room.png',
        linkTo: '/sign-in'
    },
    {
        streamingItemName: 'Doc. Room',
        streamingItemImage: '/streamingLibrary/doc-room.png',
        linkTo: '/sign-in'
    },
    {
        streamingItemName: 'Podcasts',
        streamingItemImage: '/streamingLibrary/podcasts-room.png',
        linkTo: '/sign-in'
    },
    {
        streamingItemName: 'TV Series',
        streamingItemImage: '/streamingLibrary/tv-series.png',
        linkTo: '/sign-in'
    },
]

export function StreamingLibrary() {
    const streamingLibraryRef = useRef<HTMLElement>(null)
    const isInView = useInView(streamingLibraryRef, { once: true, rootMargin: "-720px 0px 0px 0px" } as any)

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (

        <motion.section
            variants={slideInViewYaxisVarints}
            initial="hidden"
            animate={mainControls}
            className="streaming-library" ref={streamingLibraryRef}>
            {streamingLibraryConfig.map((el, idx) =>
                <StreamingLibraryItem key={`${el.streamingItemName}-${idx}`} {...el} />
            )}
        </motion.section>
    )
}