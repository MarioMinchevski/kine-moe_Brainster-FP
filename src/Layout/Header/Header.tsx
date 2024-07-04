
import { PopularMoviesBanner } from "./components/PopularMoviesBanner";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MediaItemType } from "../../SharedTypes/SharedTypes";
import { MediaSliderWrap } from "../MediaSliderWrap/MediaSliderWrap";
import { fadeInVariants } from "../Utils/animationVariants";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, EmailShareButton, LinkedinShareButton, RedditShareButton, FacebookMessengerShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon, EmailIcon, LinkedinIcon, RedditIcon, FacebookMessengerIcon } from "react-share";

const popularHomeMovies = [
    {
        id: "3",
        thumbnailImage: "/mediaThumbnails/balkankan.png"
    },
    {
        id: "19",
        thumbnailImage: "/mediaThumbnails/lazar.png"
    },
    ,
    {
        id: "9",
        thumbnailImage: "/mediaThumbnails/do-balchak.png"
    },
    {
        id: "34",
        thumbnailImage: "/mediaThumbnails/treto-poluvreme.png"
    },
]

const mediaSliderWrapConfig = [
    {
        title: 'Popular', content: popularHomeMovies, isUnique: true
    }
]

const headerBannerMenuConfig = [
    {
        id: '3',
        img: '/movieBanners/balkankan-banner.png',
        logo: '/movieLogos/balkankan-logo.png',
        desc: 'Дезертер од македонската војска и неговиот италијански крвен брат, бараат мртва баба завиткана во украден килим низ криминалниот свет на Балканот.'
    },
    {
        id: '9',
        img: '/movieBanners/do-balchak-banner.png',
        logo: '/movieLogos/do-balchak-logo.png',
        desc: 'Македонија е мала земја, во срцето на Балканот, која пет века била под јарамот на Отоманската Империја.'
    },
    {
        id: '19',
        img: '/movieBanners/lazar-banner.png',
        logo: '/movieLogos/lazar-logo.png',
        desc: 'При шверцување на нелегални личности во Европа, Лазар ќе се соочи со невозможен избор.'
    },
    {
        id: '34',
        img: '/movieBanners/treto-poluvreme-banner.png',
        logo: '/movieLogos/treto-poluvreme-logo.png',
        desc: 'Фудбалер кој игра за македонскиот фудбалски клуб се заљубува во Еврејка. Но, нивната среќа е загрозена од новата нацистичка влада, која пука и во еврејскиот тренер на клубот.'
    }
]

const slideVariants = {
    enter: {
        x: 1920,
        opacity: 0,
        zIndex: 1,
    },
    center: {
        x: 0,
        opacity: 1,
        zIndex: 2,
    },
    exit: {
        x: -1920,
        opacity: 0,
        zIndex: 1,
    }
}

const textSlideVariants = {
    enter: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }

}

interface Likes {
    [key: string]: boolean
}

interface ToWatchList {
    [key: string]: boolean
}

export function Header() {
    const [bannerIdx, setBannerIdx] = useState(0)

    const [likes, setLikes] = useState<Likes>({})
    const [toWatchList, setToWatchList] = useState<ToWatchList>({})

    const linkRef = useRef<HTMLParagraphElement>(null)
    const [isSharePopUpVisible, setIsSharePopUpVisible] = useState<boolean>(false)
    const [isCopyMessageVisible, setIsCopyMessageVisible] = useState<boolean>(false)

    const location = useLocation()
    const navigate = useNavigate()

    const isMoviesPage = location.pathname === '/movies'
    const isHomePage = location.pathname === '/home'

    // banner animations handler

    function nextStep() {
        setBannerIdx((prevIdx) => (prevIdx + 1) % headerBannerMenuConfig.length)
    }

    useEffect(() => {
        const intervalId = setInterval(nextStep, 8000)

        return () => clearInterval(intervalId)
    }, [])

    // handle likes and add to watch btns

    const handleLikeClick = () => {
        setLikes((prevLikes) => {
            const currentId = headerBannerMenuConfig[bannerIdx].id;
            return { ...prevLikes, [currentId]: !prevLikes[currentId] }
        })
    }

    const handleToWatchList = () => {
        setToWatchList((prevToWatchList) => {
            const currentId = headerBannerMenuConfig[bannerIdx].id;
            return { ...prevToWatchList, [currentId]: !prevToWatchList[currentId] }
        })
    }

    const currentSlide = headerBannerMenuConfig[bannerIdx]
    const isLiked = likes[currentSlide.id]
    const isAddedToWatchList = toWatchList[currentSlide.id]

    // link copy text handler

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
        <>
            <header className="header">
                {isMoviesPage &&
                    <h1 className="main-title">Movies Room</h1>
                }
                {/* search icon */}
                <Link to='/search' className="to-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
                <div className="category-select-input__wrap">
                    <select name="category-select-input" id="category-select-input" className="category-select-input" defaultValue="" >
                        <option className="input-option" value="" disabled>Categories</option>
                        <option className="input-option" value="Comedy" >Comedy</option>
                        <option className="input-option" value="Drama" >Drama</option>
                        <option className="input-option" value="Action" >Action</option>
                        <option className="input-option" value="Kids" >Kids</option>

                    </select>
                    <small className="dropdown-arrow">
                        <div className="d-line"></div>
                        <div className="d-line"></div>
                    </small>
                </div>
                {/* cta wrap */}
                <div className="movie-banner__cta-button-container">
                    <button
                        onClick={() => {
                            const activeSlideId = headerBannerMenuConfig[bannerIdx].id;
                            navigate(`/watch/${activeSlideId}`)
                        }}
                        className="banner-play-button">
                        <img src="/icons/play-icon.png" />
                        <span>Гледај</span>
                    </button>
                    <button
                        className={`banner-icon-button ${isLiked ? "filled" : ''}`}
                        onClick={handleLikeClick}>
                        <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} />
                    </button>
                    <button
                        className={`banner-icon-button ${isAddedToWatchList ? "filled" : ''}`}
                        onClick={handleToWatchList}>
                        {!isAddedToWatchList && <img src="/icons/add-icon.png" alt="add-icon" />}
                        {isAddedToWatchList && <img src="/icons/add-icon-active.png" alt="add-icon" />}
                    </button>
                    <button
                        onClick={() => { setIsSharePopUpVisible(true) }}
                        className="banner-icon-button"><img src="/icons/share-icon.png" alt="share-icon" /></button>
                </div>
                {/* banner wrap */}
                <div className="header-banner-slideshow">
                    <AnimatePresence initial={false} custom={bannerIdx}>
                        {headerBannerMenuConfig.map((el, idx) => (
                            idx === bannerIdx && (
                                <motion.div
                                    key={idx}
                                    custom={idx}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.8 }}
                                    style={{ position: 'absolute', width: '100%' }}
                                >
                                    <PopularMoviesBanner {...el} />
                                </motion.div>
                            )
                        ))}
                        <motion.div className="movie-banner-info"
                            variants={textSlideVariants}
                            initial="enter"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 1 }}
                            key={`${currentSlide.id}-key`}
                        >
                            <div className="movie-banner__logo-box">
                                <img src={currentSlide.logo} alt="movie-logo" />
                            </div>
                            <p className="movie-banner__description">
                                {currentSlide.desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                {isHomePage &&
                    <motion.div
                        initial={{ x: "50%" }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 30, damping: 5, }}
                        className="popular-movies-slider">
                        {mediaSliderWrapConfig.map((slider, idx) => (
                            <MediaSliderWrap
                                key={`popular-movies-slider-${slider.title}-${idx}`}
                                title=""
                                content={slider.content as MediaItemType[]}
                                isUnique={slider.isUnique}
                                idx={idx}
                                extraClass="popular-movies-home"
                            />
                        ))}
                    </motion.div>}
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
                                    <FacebookShareButton url={`http://localhost:5173/watch/${currentSlide.id}`}>
                                        <FacebookIcon iconFillColor='white' round={true}>
                                        </FacebookIcon>
                                    </FacebookShareButton>
                                    <TwitterShareButton url={`http://localhost:5173/watch/${currentSlide.id}`}>
                                        <TwitterIcon iconFillColor='white' round={true}>
                                        </TwitterIcon>
                                    </TwitterShareButton>
                                    <WhatsappShareButton url={`http://localhost:5173/watch/${currentSlide.id}`}>
                                        <WhatsappIcon iconFillColor='white' round={true}>
                                        </WhatsappIcon>
                                    </WhatsappShareButton>
                                    <EmailShareButton url={`http://localhost:5173/watch/${currentSlide.id}`}>
                                        <EmailIcon iconFillColor='white' round={true}>
                                        </EmailIcon>
                                    </EmailShareButton>
                                    <LinkedinShareButton url={`http://localhost:5173/watch/${currentSlide.id}`}>
                                        <LinkedinIcon iconFillColor='white' round={true}>
                                        </LinkedinIcon>
                                    </LinkedinShareButton>
                                    <RedditShareButton url={`http://localhost:5173/watch/${currentSlide.id}`}>
                                        <RedditIcon iconFillColor='white' round={true}>
                                        </RedditIcon>
                                    </RedditShareButton>
                                    <FacebookMessengerShareButton
                                        url={`http://localhost:5173/watch/${currentSlide.id}`}
                                        appId="example_app_id"
                                    >
                                        <FacebookMessengerIcon iconFillColor='white' round={true} />
                                    </FacebookMessengerShareButton>
                                </div>
                                <div className="link-box">
                                    <p ref={linkRef}>{`http://localhost:5173/watch/${currentSlide.id}`}</p>
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
            </header >
        </>
    )
}