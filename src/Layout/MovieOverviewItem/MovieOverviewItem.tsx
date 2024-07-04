import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieOverviewVideoPlayer } from "../MovieOverviewVideoPlayer/MovieOverviewVideoPlayer";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faPause, faPlay, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArtistItemType, MediaItemType } from "../../SharedTypes/SharedTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";
import React from "react";
import { fetchArtists } from "../../utils/fetchArtists";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon, FacebookMessengerShareButton, FacebookMessengerIcon } from "react-share";
import { fadeInVariants } from "../Utils/animationVariants";

// animation variants

const bodyVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 3 } },
}

const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
}

const wrapVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
}

const pgRatedForConfig = [
    "Language",
    "Violence",
    "Thematic Elements",
    "Sexual Content",
    "Nudity",
    "Frightening/Intense Scenes",
    "Humor",
]

// func to generate two random "rated for", categories
function getRandomUniqueElements(arr: string[], numElements: number): string[] {
    const uniqueElements = new Set<string>()
    while (uniqueElements.size < numElements) {
        const randomIndex = Math.floor(Math.random() * arr.length)
        uniqueElements.add(arr[randomIndex])
    }
    return [...uniqueElements]
}

export function MovieOverviewItem() {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMute] = useState(true)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const [currentMediaItem, setCurrentMediaItem] = useState<MediaItemType>()

    const linkRef = useRef<HTMLParagraphElement>(null)
    const [isSharePopUpVisible, setIsSharePopUpVisible] = useState<boolean>(false)
    const [isCopyMessageVisible, setIsCopyMessageVisible] = useState<boolean>(false)

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isAddedToWatch, setIsAddedToWatch] = useState<boolean>(false)

    const navigate = useNavigate()
    const { id } = useParams()

    const [pgRatedFor, setPgRatedFor] = useState<string[]>([])

    const { data: allArtists, error: artistError, isLoading: artistLoading } = useQuery<ArtistItemType[]>({
        queryFn: fetchArtists,
        queryKey: ['artists'],
    });

    const { data: allMediaItems, error: errorTwo, isLoading: isLoadingTwo, isSuccess } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies'],
    })

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
            setPgRatedFor(getRandomUniqueElements(pgRatedForConfig, 2))
        }
    }, [isSuccess, allMediaItems, id, navigate])

    if (isLoadingTwo || artistLoading) {
        return <div>Loading...</div>
    }

    if (errorTwo || artistError) {
        return <div>Error loading data</div>
    }
    // play and mute buttons actions 

    const togglePlay = () => {
        if (videoRef.current?.paused) {
            videoRef.current?.play()
            setIsPlaying(true)
        } else {
            videoRef.current?.pause()
            setIsPlaying(false)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMute(prev => !prev)
        }
    }

    // func to find artist ID by name

    const findArtistIdByName = (name: string) => {
        const artist = allArtists?.find(artist => artist.nameAndSurname === name)
        return artist ? artist.id : null
    }

    // back one step in history

    const handleGoBack = () => {
        navigate('/home')
    }

    // handle to watch page

    const handleToWatch = () => {
        navigate(`/watch/${id}`)
    }

    // handle copy link

    const handleCopyClick = () => {
        if (linkRef.current) {
            const linkText = linkRef.current.textContent ?? ''
            navigator.clipboard.writeText(linkText).then(() => {
                setIsCopyMessageVisible(true)
                setTimeout(() => {
                    setIsCopyMessageVisible(false)
                }, 2000)
            }).catch(err => {
                console.error("Failed to copy text: ", err)
            })
        }
    }

    return (
        <motion.div className="movie-overview__wrap"
            variants={wrapVariants} initial="hidden" animate="visible"
        >
            <button onClick={handleGoBack} className="share-button">
                <img src="/movieOverview/share-icon-1.png" />
            </button>
            <motion.div className="movie-overview__header"
                variants={headerVariants} initial="hidden" animate="visible"
            >
                <MovieOverviewVideoPlayer ref={videoRef} />
                <div className="background-effect"></div>
                <div className="movie-overview__logo-and-desc">
                    <div className="logo-box">
                        <img src="/movieOverview/treto-poluvreme-logo.png" alt="movie-logo" />
                    </div>
                    <div className="desc-box">
                        <p>
                            {currentMediaItem?.description}
                            <span className="see-more"> See more...</span></p>

                    </div>
                </div>
            </motion.div>
            <motion.div className="movie-overview__body"
                variants={bodyVariants} initial="hidden" animate="visible"
            >
                <div className="movie-overview__cta-buttons-wrap">
                    <div className="movie-overview__cta-button-container">
                        <button
                            onClick={handleToWatch}
                            className="overview-play-button">
                            <img src="/icons/play-icon.png" />
                            <span>Гледај</span>
                        </button>
                        <button
                            className={`overview-icon-button ${isLiked ? "filled" : ''}`}
                            onClick={() => setIsLiked(prev => !prev)}>
                            <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} />
                        </button>
                        <button
                            onClick={() => setIsAddedToWatch(prev => !prev)}
                            className="overview-icon-button">
                            {!isAddedToWatch && <img src="/icons/add-icon.png" alt="add-icon" />}
                            {isAddedToWatch && <img src="/icons/add-icon-active.png" alt="add-icon" />}
                        </button>
                        <button
                            onClick={() => { setIsSharePopUpVisible(true) }}
                            className="overview-icon-button"><img src="/icons/share-icon.png" alt="share-icon" /></button>
                    </div>
                    <div className="sound-and-play">
                        <button className="play-pause-cta-button" onClick={togglePlay}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                        </button>
                        <button className="sound-cta-button" onClick={toggleMute}>
                            {isMuted ? <img src="/movieOverview/sound-on-off.png" alt="mute" /> : <FontAwesomeIcon icon={faVolumeXmark} />}
                        </button>
                    </div>
                </div>
                <div className="movie-overview__info">
                    <div className="match-and-rating">
                        <h2>100% Match 2024</h2>
                    </div>
                    <div className="pg-rating-box">
                        <span>{currentMediaItem?.contentRating}</span>
                    </div>
                    <span className="pg-rated-for">{pgRatedFor.join(', ')}</span>
                </div>
                <div className="movie-overview__credits">
                    <div className="movie-overview__credits-box">
                        <div className="movie-overview__credits-item">
                            <h3>Genres: &nbsp;
                                <span>{currentMediaItem?.genres.join(', ')}</span>
                            </h3>

                        </div>
                        <div className="movie-overview__credits-item">
                            <h3>Cast:  &nbsp;
                                <span>
                                    {currentMediaItem?.cast.map((castMember, index) => {
                                        const artistId = findArtistIdByName(castMember);
                                        return artistId ? (
                                            <React.Fragment key={artistId}>
                                                {index !== 0 && ", "}
                                                <Link to={`/artist-overview/${artistId}`}>
                                                    {castMember}
                                                </Link>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={castMember}>
                                                {index !== 0 && ", "}
                                                {castMember}
                                            </React.Fragment>
                                        );
                                    })}
                                </span>
                            </h3>

                        </div>
                        <div className="movie-overview__credits-item">
                            <h3>Director: <span>{currentMediaItem?.director}</span></h3>
                        </div>
                    </div>
                    <div className="movie-overview__credits-box">
                        <div className="movie-overview__credits-item">
                            <h3>Writers:  <span>{currentMediaItem?.writers.join(', ')}</span></h3>

                        </div>
                        <div className="movie-overview__credits-item">
                            <h3>Producers: <span> {currentMediaItem?.producers.join(', ')}</span></h3>

                        </div>
                        <div className="movie-overview__credits-item">
                            <h3>Cinematography: <span>{currentMediaItem?.cinematography}</span></h3>
                        </div>
                    </div>
                    <div className="movie-overview__credits-box">
                        <div className="movie-overview__credits-item">
                            <h3>Editing:  <span>{currentMediaItem?.editing}</span></h3>

                        </div>
                        <div className="movie-overview__credits-item">
                            <h3>Costume Design: <span> {currentMediaItem?.costumeDesign}</span></h3>

                        </div>
                    </div>
                </div>
            </motion.div>

            {isSharePopUpVisible &&
                <>
                    <motion.div className="share-box" {...fadeInVariants}>
                        <div className="share-box__helper-wrap">
                            <button
                                onClick={() => { setIsSharePopUpVisible(false) }}
                                className="close-btn">X</button>
                        </div>
                        <div className="share-box__header">
                            <h2>Share this movie</h2>
                        </div>
                        <div className="share-box__body">
                            <h3>Share via</h3>
                            <div className="icons-wrap">
                                <FacebookShareButton url={`http://localhost:5173/watch/${id}`}>
                                    <FacebookIcon iconFillColor='white' round={true}>
                                    </FacebookIcon>
                                </FacebookShareButton>
                                <TwitterShareButton url={`http://localhost:5173/watch/${id}`}>
                                    <TwitterIcon iconFillColor='white' round={true}>
                                    </TwitterIcon>
                                </TwitterShareButton>
                                <WhatsappShareButton url={`http://localhost:5173/watch/${id}`}>
                                    <WhatsappIcon iconFillColor='white' round={true}>
                                    </WhatsappIcon>
                                </WhatsappShareButton>
                                <EmailShareButton url={`http://localhost:5173/watch/${id}`}>
                                    <EmailIcon iconFillColor='white' round={true}>
                                    </EmailIcon>
                                </EmailShareButton>
                                <LinkedinShareButton url={`http://localhost:5173/watch/${id}`}>
                                    <LinkedinIcon iconFillColor='white' round={true}>
                                    </LinkedinIcon>
                                </LinkedinShareButton>
                                <RedditShareButton url={`http://localhost:5173/watch/${id}`}>
                                    <RedditIcon iconFillColor='white' round={true}>
                                    </RedditIcon>
                                </RedditShareButton>
                                <FacebookMessengerShareButton
                                    url={`http://localhost:5173/watch/${id}`}
                                    appId="example_app_id"
                                >
                                    <FacebookMessengerIcon iconFillColor='white' round={true} />
                                </FacebookMessengerShareButton>
                            </div>
                            <div className="link-box">
                                <p ref={linkRef}>{`http://localhost:5173/watch/${id}`}</p>
                                <button onClick={handleCopyClick} className="copy-btn">Copy</button>
                                {isCopyMessageVisible &&
                                    <motion.p
                                        {...fadeInVariants}
                                        className="link-copied">Link copied to clipboard</motion.p>}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        {...fadeInVariants}
                        className="share-overlay"></motion.div>
                </>
            }
        </motion.div>
    )
}

