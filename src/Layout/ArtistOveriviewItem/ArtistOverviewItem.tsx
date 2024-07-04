import { useQuery } from "@tanstack/react-query";
import { ArtistItemType, MediaItemType } from "../../SharedTypes/SharedTypes";
import { fetchArtists } from "../../utils/fetchArtists";
import { MediaSliderWrap } from "../MediaSliderWrap/MediaSliderWrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";

// animation variants

const bodyVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 3.5 } },
}

const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
}

const wrapVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
}


export function ArtistOverviewItem() {
    const [currentArtistItem, setCurrentArtistItem] = useState<ArtistItemType>()

    const { data: allArtists, error: artistError, isLoading: artistLoading, isSuccess: isSuccessArtists } = useQuery<ArtistItemType[]>({
        queryFn: fetchArtists,
        queryKey: ['artists']
    })

    // these two can be a single func as well

    const { data: allMediaItems, error: mediaError, isLoading: mediaLoading } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies']
    })

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id && isSuccessArtists && allArtists) {
            const foundItem = allArtists?.find(artist => artist.id === id)
            if (foundItem) {
                setCurrentArtistItem(foundItem)
            } else {
                navigate('/not-found')
            }
        }
    }, [id, allArtists, navigate, isSuccessArtists])

    if (artistError || mediaError || artistLoading || mediaLoading) {
        return <div>Loading...</div>
    }

    // find the movies the artist has played in

    // this wil be changed in a real case sceranio, "movies" values will
    // be used from the artist obj. This is currently as it is so I can get more
    // movies in the slider for a better look 

    const moviesAppearedIn = currentArtistItem
        ? allMediaItems?.filter(mediaItem =>
            mediaItem.cast.includes(currentArtistItem.nameAndSurname)
        ) : []

    // back one step in history

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <motion.div className="artist-overview__wrap"
            variants={wrapVariants} initial="hidden" animate="visible"
        >
            <motion.div className="artist-overview__header"
                variants={headerVariants} initial="hidden" animate="visible"
            >
                <div className="artist-overview__img-box">
                    <img src={currentArtistItem?.image} alt={`${currentArtistItem?.nameAndSurname}-image`} />
                </div>
                <div className="artist-overview__description">
                    <h1>{currentArtistItem?.nameAndSurname}</h1>
                    <p>{currentArtistItem?.description}</p>
                    <button className="artist-see-more-btn">See more</button>
                </div>
                <div onClick={handleGoBack} className="share-icon">
                    <img src="/icons/share-icon-1.png" />
                </div>
            </motion.div>
            <motion.div
                variants={bodyVariants} initial="hidden" animate="visible"
            >
                <div className="artist-overview__movies">
                    <MediaSliderWrap
                        title="Филмови"
                        content={moviesAppearedIn as MediaItemType[]}
                        key='Recommended-slider-wrap'
                        extraClass="artist" />
                </div>
                <ul className="artist-overview__awards">
                    {currentArtistItem?.awards.map((el, idx) =>
                        <li key={`${el}-${idx}`}>{el}</li>
                    )}
                </ul>
            </motion.div>
        </motion.div>
    )

}