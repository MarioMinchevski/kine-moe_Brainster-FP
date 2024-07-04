import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useUserLoggedInContext } from "../../Context/UserLoggedInContext"
import { UserType } from "../../SharedTypes/SharedTypes"
import { asideVariants, asideVariantsWelcomeMessage } from "../Utils/animationVariants"

export function AsideNavBar() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [isRoomsPopUpVisible, setIsRoomsPopUpVisible] = useState<boolean>(false)

    const { isUserWelcomed, welcomeUser } = useUserLoggedInContext()

    const roomsPopUpRef = useRef<HTMLDivElement | null>(null)

    const userItem = localStorage.getItem('user')

    let userObject: UserType | {} = {}

    if (userItem) {
        userObject = JSON.parse(userItem) as UserType;
    }

    const username = (userObject as UserType).username

    // log out btn
    const { logUserOut } = useUserLoggedInContext()

    const handleLogOut = () => {
        logUserOut()
    }

    // handling the hover effect

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        setHoveredItem(e.currentTarget.getAttribute("data-item"))
    }

    const handleMouseLeave = () => {
        setHoveredItem(null)
    }

    // rooms pop up

    const handleRoomsPopUpVisibility = () => {
        setIsRoomsPopUpVisible((prevState) => !prevState)
    }

    // close the room pop up upon clicking anywhere on the screen

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (roomsPopUpRef.current && !roomsPopUpRef.current.contains(event.target as Node)) {
                setIsRoomsPopUpVisible(false)
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    // render the welcome message only in the home tab

    const location = useLocation()
    const isHome = location.pathname === '/home'

    const handleWelcomeUser = () => {
        welcomeUser()
    }

    useEffect(() => {
        if (isHome) {
            setTimeout(() => {
                handleWelcomeUser()
            }, 6000)
        }
    }, [location.pathname])

    return (
        <>
            <AnimatePresence>
                {(!isUserWelcomed && isHome) && (
                    <motion.div
                        variants={asideVariantsWelcomeMessage}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="welcome-message"
                    >
                        <p>Welcome {username}!</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.nav
                variants={asideVariants} initial="hidden" animate="visible"
                className="aside-navbar">

                <Link
                    to="/user-profile"
                    className={`nav-item ${hoveredItem === "Profile" ? "hovering" : ""}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    data-item="Profile"
                >
                    <img src="/icons/user-icon.png" alt="user-icon" />
                    <span className="nav-item__text">Profile</span>
                </Link>

                <div className="aside-navbar__wrap">
                    <Link
                        to="/home"
                        className={`nav-item ${hoveredItem === "Home" ? "hovering" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        data-item="Home"
                    >
                        <img src="/icons/home-icon.png" alt="home-icon" />
                        <span className="nav-item__text">Home</span>
                    </Link>

                    <div className="rooms-pop-up-wrap" ref={roomsPopUpRef}>
                        <div
                            className={`nav-item ${hoveredItem === "Rooms" ? "hovering" : ""}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleRoomsPopUpVisibility}
                            data-item="Rooms"
                        >
                            <img src="/icons/rooms-icon.png" alt="rooms-icon" />
                            <span className="nav-item__text">Rooms</span>
                        </div>

                        <div className={`nav-item__rooms-wrap ${isRoomsPopUpVisible ? "visible" : ""}`}>
                            <Link
                                to="/movies"
                                className={`room-wrap-item ${hoveredItem === "Movies" ? "hovering" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                data-item="Movies"
                            >
                                <img src="/icons/movie-reel-icon.png" alt="movie-reel-icon" />
                                <span>Movies</span>
                            </Link>
                            <Link
                                to="/movies"
                                className={`room-wrap-item ${hoveredItem === "Series" ? "hovering" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                data-item="Series"
                            >
                                <img src="/icons/tv-icon.png" alt="tv-icon" />
                                <span>Series</span>
                            </Link>
                            <Link
                                to="/movies"
                                className={`room-wrap-item ${hoveredItem === "Podcasts" ? "hovering" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                data-item="Podcasts"
                            >
                                <img src="/icons/microphone-icon.png" alt="microphone-icon" />
                                <span>Podcasts</span>
                            </Link>
                            <Link
                                to="/movies"
                                className={`room-wrap-item ${hoveredItem === "Kids" ? "hovering" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                data-item="Kids"
                            >
                                <img src="/icons/smiley-icon.png" alt="smiley-icon" />
                                <span>Kids</span>
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/community-page"
                        className={`nav-item ${hoveredItem === "Chat" ? "hovering" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        data-item="Chat"
                    >
                        <img src="/icons/communit-icon.png" alt="chat-icon" />
                        <span className="nav-item__text">Chat</span>
                    </Link>

                    <Link
                        to="#"
                        className={`nav-item ${hoveredItem === "Movie Hall" ? "hovering" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        data-item="Movie Hall"
                    >
                        <img src="/icons/movie-hall-icon.png" alt="movie-hall-icon" />
                        <span className="nav-item__text">Movie Hall</span>
                    </Link>
                </div>
                <div className="aside-navbar__wrap-two">
                    <Link
                        to="/user-profile"
                        className={`nav-item ${hoveredItem === "Settings" ? "hovering" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        data-item="Settings"
                    >
                        <img src="/icons/settings-icon.png" alt="settings-icon" />
                        <span className="nav-item__text">Settings</span>
                    </Link>
                    <Link
                        to="/"
                        className={`nav-item ${hoveredItem === "Log-out" ? "hovering" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        data-item="Log-out"
                        onClick={handleLogOut}
                    >
                        <img src="/icons/log-out-icon.png" alt="settings-icon" />
                        <span className="nav-item__text">Log-out</span>
                    </Link>
                </div>
            </motion.nav>
        </>
    )
}