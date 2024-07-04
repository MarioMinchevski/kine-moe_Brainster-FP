import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons/faHeart";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserInfoDiagrams } from "../SharedComponents/UserInfoDiagrams/UserInfoDiagrams";
import { UserType } from "../../SharedTypes/SharedTypes";
import { fadeInVariants } from "../Utils/animationVariants";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const variants = {
    hidden: { scale: 0 },
    visible: {
        scale: [0.5, 1.075, 1],
        transition: {
            duration: 1,
            times: [0, 0.5, 1],
            ease: "easeInOut",
        },
    },
};

export function UserInfo() {
    const [diagramCommentScore, setDiagramCommentScore] = useState(0)
    const [diagramDiscussionScore, setDiagramDiscussionScore] = useState(0)

    const [isUserFollowed, setIsUserFollowed] = useState<boolean>(false)
    const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false)

    const [showUserMessageFollow, setShowUserMessageFollow] = useState<boolean>(false)
    const [showUserMessageFriendRequest, setShowUserMessageFriendRequest] = useState<boolean>(false)

    const linkRef = useRef<HTMLParagraphElement>(null)
    const [isSharePopUpVisible, setIsSharePopUpVisible] = useState<boolean>(false)
    const [isCopyMessageVisible, setIsCopyMessageVisible] = useState<boolean>(false)

    // handling the pop um messages effects

    useEffect(() => {
        let timer1: ReturnType<typeof setTimeout>

        if (isUserFollowed) {
            setShowUserMessageFollow(true)
            timer1 = setTimeout(() => {
                setShowUserMessageFollow(false)
            }, 2000)
        } else {
            setShowUserMessageFollow(false)
        }

        return () => {
            clearTimeout(timer1)
        }
    }, [isUserFollowed])

    useEffect(() => {
        let timer2: ReturnType<typeof setTimeout>

        if (isFriendRequestSent) {
            setShowUserMessageFriendRequest(true)
            timer2 = setTimeout(() => {
                setShowUserMessageFriendRequest(false)
            }, 2000)
        } else {
            setShowUserMessageFriendRequest(false)
        }

        return () => {
            clearTimeout(timer2)
        }
    }, [isFriendRequestSent])

    // Retrieve user data from localStorage

    const userInfoString = localStorage.getItem("user")
    const userInfo: UserType = userInfoString ? JSON.parse(userInfoString) : null

    const { image, description, username, userType } = userInfo

    // random amount of number for comments and discussions to show the animation better


    const getRandomNumberInRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    useEffect(() => {
        setDiagramCommentScore(getRandomNumberInRange(25, 100))
        setDiagramDiscussionScore(getRandomNumberInRange(1, 20))
    }, [])

    const isImageBase64 = image && image.length > 100

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
        <div className="user-info">
            <motion.div className="user-info__img-box" variants={variants} initial="hidden" animate="visible"
                transformTemplate={({ scale }) => `translate(-50%, -50%) scale(${scale})`}
            >
                <img
                    src={image
                        ? isImageBase64
                            ? `data:image/png;base64,${image}`
                            : image
                        : "/userProfile/profile-picure.png"
                    }
                    alt="profile-pic"
                    className="user-img"
                />
                {userType && userType.toLowerCase() === 'artist' &&
                    <img src="/userProfile/verified-artist.png" alt="verified-pic" className="verified-artist" />}
            </motion.div>
            <div className="user-info__header">
                <h1>{username}</h1>
                <h2>Movie Enjoyer</h2>
            </div>
            <div className="user-info__description">
                <p>{description}</p>
            </div>
            <div className="user-info__badges">
                <h3>Badges</h3>
                <div className="badges-wrap">
                    <div className="badge-icon">
                        <img src="/userProfile/badge-1.png" />
                    </div>
                    <div className="badge-icon">
                        <img src="/userProfile/badge-2.png" />
                    </div>
                    <div className="badge-icon">
                        <img src="/userProfile/badge-3.png" />
                    </div>
                    <div className="badge-icon">
                        <img src="/userProfile/badge-4.png" />
                    </div>
                </div>
            </div>
            <div className="user-info__diagrams">
                <div className="comments-diagram">
                    <div className="comments-diagram__inner-wrap">
                        <UserInfoDiagrams score={diagramCommentScore} />
                    </div>
                    <span>Comments</span>
                </div>
                <div className="discussion-diagram">
                    <div className="discussion-diagram__inner-wrap">
                        <UserInfoDiagrams score={diagramDiscussionScore} />
                    </div>
                    <span>Discussions</span>
                </div>
            </div>
            <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0, transition: { duration: 0.65 } }}
                className="user-profile__cta-button-container">
                <button
                    onClick={() => { setIsUserFollowed(prev => !prev) }}
                    className={`user-profile-icon-button ${isUserFollowed ? 'filled' : ''}`}>
                    <FontAwesomeIcon icon={isUserFollowed ? faHeartSolid : faHeartRegular} />
                </button>
                <button
                    onClick={() => setIsFriendRequestSent(prev => !prev)}
                    className="user-profile-icon-button">
                    {!isFriendRequestSent && <img src="/icons/add-icon.png" alt="add-icon" />}
                    {isFriendRequestSent && <img src="/icons/add-icon-active.png" alt="add-icon" />}
                </button>
                <button
                    onClick={() => setIsSharePopUpVisible(true)}
                    className="user-profile-icon-button">
                    <img src="/icons/share-icon.png" alt="share-icon" />
                </button>
            </motion.div>
            <div className="user-info-message-wrap">
                {showUserMessageFollow && (
                    <motion.div
                        {...fadeInVariants}
                        className="user-info-message">
                        <p>You are following <span>{username}</span>!</p>
                    </motion.div>
                )}
                {showUserMessageFriendRequest && (
                    <motion.div
                        {...fadeInVariants}
                        className="user-info-message">
                        <p>Friend request sent!</p>
                    </motion.div>
                )}
            </div>

            {isSharePopUpVisible &&
                <>
                    <motion.div className="share-box" {...fadeInVariants}>
                        <div className="share-box__helper-wrap">
                            <button
                                onClick={() => { setIsSharePopUpVisible(false) }}
                                className="close-btn">X</button>
                        </div>
                        <div className="share-box__header">
                            <h2>Share this user</h2>
                        </div>
                        <div className="share-box__body">
                            <h3>Share via</h3>
                            <div className="icons-wrap">
                                <FacebookShareButton url={`http://localhost:5173/user-profile/${username}`}>
                                    <FacebookIcon iconFillColor='white' round={true}>
                                    </FacebookIcon>
                                </FacebookShareButton>
                                <TwitterShareButton url={`http://localhost:5173/user-profile/${username}`}>
                                    <TwitterIcon iconFillColor='white' round={true}>
                                    </TwitterIcon>
                                </TwitterShareButton>
                                <WhatsappShareButton url={`http://localhost:5173/user-profile/${username}`}>
                                    <WhatsappIcon iconFillColor='white' round={true}>
                                    </WhatsappIcon>
                                </WhatsappShareButton>
                                <EmailShareButton url={`http://localhost:5173/user-profile/${username}`}>
                                    <EmailIcon iconFillColor='white' round={true}>
                                    </EmailIcon>
                                </EmailShareButton>
                                <LinkedinShareButton url={`http://localhost:5173/user-profile/${username}`}>
                                    <LinkedinIcon iconFillColor='white' round={true}>
                                    </LinkedinIcon>
                                </LinkedinShareButton>
                                <RedditShareButton url={`http://localhost:5173/user-profile/${username}`}>
                                    <RedditIcon iconFillColor='white' round={true}>
                                    </RedditIcon>
                                </RedditShareButton>
                                <FacebookMessengerShareButton
                                    url={`http://localhost:5173/user-profile/${username}`}
                                    appId="example_app_id"
                                >
                                    <FacebookMessengerIcon iconFillColor='white' round={true} />
                                </FacebookMessengerShareButton>
                            </div>
                            <div className="link-box">
                                <p ref={linkRef}>{`http://localhost:5173/user-profile/${username}`}</p>
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
        </div >
    )
}