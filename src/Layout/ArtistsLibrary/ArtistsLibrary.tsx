import { ArtistLibraryItem } from "./components/ArtistLibraryItem";
import { motion, useAnimation, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react";
import { slideInViewYaxisVarintsAlt } from '../Utils/animationVariants';
import { useQuery } from "@tanstack/react-query";
import { ArtistItemType } from "../../SharedTypes/SharedTypes";
import { fetchArtists } from "../../utils/fetchArtists";


// const artistConfig = [
//     {
//         img: '/artistsThumbnails/Igor-djambazov.png'
//     },
//     {
//         img: '/artistsThumbnails/Rade-sherbedjija.png'
//     },
//     {
//         img: '/artistsThumbnails/Sashko-kocev.png'
//     },
//     {
//         img: '/artistsThumbnails/Toni-mihajlovski.png'
//     },
//     {
//         img: '/artistsThumbnails/Rade-sherbedjija.png'
//     },
//     {
//         img: '/artistsThumbnails/Sashko-kocev.png'
//     }
// ]

export function ArtistLibrary() {
    const [width, setWidth] = useState(0)
    const carousel = useRef<HTMLDivElement>(null)
    const artistLibraryRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(artistLibraryRef, { once: true })

    const mainControls = useAnimation()

    const { data: artistsItems } = useQuery<ArtistItemType[]>({
        queryFn: fetchArtists,
        queryKey: ['artists']
    })

    useEffect(() => {
        setTimeout(() => {
            if (carousel.current) {
                setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth + 53.6) // +54.6px is becasue of the inner carausel gap and the carousel padding 
            }
        }, 1000)
    }, [carousel])

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <motion.section
            ref={artistLibraryRef}
            variants={slideInViewYaxisVarintsAlt}
            initial="hidden"
            animate={mainControls}
            className="artist-library">
            <h2>Meet the artists</h2>
            <motion.div
                ref={carousel}
                className="carousel">
                <motion.div
                    drag='x'
                    whileTap={{ cursor: "grabbing" }}
                    whileHover={{ cursor: "pointer" }}
                    dragConstraints={{ right: 0, left: -width }}
                    className="inner-carousel">
                    {artistsItems?.map((el, idx) =>
                        <motion.div key={idx}>
                            <ArtistLibraryItem  {...el} />
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </motion.section>
    )
}


