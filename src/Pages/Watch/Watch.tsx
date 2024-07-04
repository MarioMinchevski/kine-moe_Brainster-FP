import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WatchVideoPlayer } from "../../Layout/WatchVideoPlayer/WatchVideoPlayer";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";
import { MediaItemType } from "../../SharedTypes/SharedTypes";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

export function Watch() {
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [currentMediaItem, setCurrentMediaItem] = useState<MediaItemType>()

    const { data: allMediaItems, error, isLoading, isSuccess } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies'],
    })

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (isSuccess && allMediaItems) {
            if (id) {
                const foundItem = allMediaItems.find(item => item.id === id)
                if (foundItem) {
                    setCurrentMediaItem(foundItem)
                } else {
                    navigate('/not-found')
                }
            }

        }
    }, [isSuccess, allMediaItems, id, navigate])

    if (error || isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="watch-page">
            <motion.div
                className="watch-page__header-buttons"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
            >
                <button
                    onClick={() => (navigate(`/movie-overview/${id}`))}
                    className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                {!isInfoOpen && <button
                    onClick={() => setIsInfoOpen(true)}
                    className={`info-button`}>i</button>}
                {isInfoOpen && <button
                    onClick={() => setIsInfoOpen(false)}
                    className={`close-button `}>X</button>}
            </motion.div>
            {isInfoOpen &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="media-info-box">
                    <div className="info-group">
                        <h2>Title</h2>
                        <span className="title">{currentMediaItem?.title}</span>
                    </div>
                    <div className="info-group">
                        <h2>Description</h2>
                        <p className="desc">{currentMediaItem?.description}</p>
                    </div>
                    <div className="info-group">
                        <h2>Rating</h2>
                        <span className="rating">{currentMediaItem?.rating}</span>
                    </div>
                    <div className="info-group">
                        <h2>Cast</h2>
                        <span>
                            {currentMediaItem?.cast.map((castMember, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {index !== 0 && ", "}
                                        {castMember}
                                    </React.Fragment>
                                );
                            })}
                        </span>
                    </div>
                </motion.div>}
            {currentMediaItem && <WatchVideoPlayer currentMediaItem={currentMediaItem} />}
        </div>
    )
}