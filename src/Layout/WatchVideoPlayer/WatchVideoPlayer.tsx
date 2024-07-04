import { faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { WatchVideoPlayerType } from "./types";
import { UserType } from "../../SharedTypes/SharedTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentOnWatch } from "../../utils/postCommentOnWatch";


export function WatchVideoPlayer({ currentMediaItem }: WatchVideoPlayerType) {
    const queryClient = useQueryClient()
    const videoPlayerRef = useRef<HTMLVideoElement>(null)

    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [currentTime, setIsCurrentTime] = useState<number>(0)
    const [totalDuration, setTotalDuration] = useState<number>(0)

    const [isVolumeRangeVisible, setIsVolueRangeVisible] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(1)

    const [mousedown, setMousedown] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const progressRef = useRef<HTMLDivElement>(null)
    const documentRef = useRef<Document | null>(null)

    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState<boolean>(false)
    const [commentText, setCommentText] = useState('')

    const [areCaptionsActive, setIsAreCaptionsActive] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)


    const currentUserString = localStorage.getItem('user')
    let currentUser: UserType | null = null

    if (currentUserString) {
        currentUser = JSON.parse(currentUserString);
    }

    const commentAuthorImg = currentUser?.image
    const commentAuthorName = currentUser?.username

    const addCommentMutation = useMutation({
        mutationFn: postCommentOnWatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] })
        },
    })

    const handleConfirm = async () => {
        try {

            if (!commentText.trim()) {
                return
            }
            if (currentMediaItem.id)
                await addCommentMutation.mutateAsync({ id: currentMediaItem.id, commentText, commentAuthorImg, commentAuthorName, currentTime })

            setCommentText('')

        } catch (err) {
            console.log("Error adding comment", err)
        }
    }

    useEffect(() => {
        documentRef.current = document
        return () => {
            documentRef.current = null
        }
    }, [])

    //buttons actions

    function handlePlayButton() {
        if (isVideoPlaying === false) {
            videoPlayerRef.current?.play()
            setIsVideoPlaying(true)
        } else {
            videoPlayerRef.current?.pause()
            setIsVideoPlaying(false)
        }
    }

    function handleForwardButton() {
        const videoPlayer = videoPlayerRef.current
        if (videoPlayer) {
            const newTime = videoPlayer.currentTime + 10
            if (newTime <= videoPlayer.duration) {
                videoPlayer.currentTime = newTime
                setIsCurrentTime(newTime)
            } else {
                videoPlayer.pause()
                setIsVideoPlaying(false)
            }
        }
    }

    function handleBackwardButton() {
        const videoPlayer = videoPlayerRef.current
        if (videoPlayer) {
            const newTime = videoPlayer.currentTime - 10
            if (newTime >= 0) {
                videoPlayer.currentTime = newTime
                setIsCurrentTime(newTime)
            } else {
                videoPlayer.currentTime = 0
                setIsCurrentTime(0)
                videoPlayer.play()
                setIsVideoPlaying(true)
            }
        }
    }

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const volumeValue = parseFloat(e.target.value);
        setVolume(volumeValue);
        if (videoPlayerRef.current) {
            videoPlayerRef.current.volume = volumeValue;
        }
    }

    // time format (minutes and seconds for now)

    function formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
        return formattedTime
    }

    // progress bar scroll 

    function scrub(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!progressRef.current) return
        const scrubTime =
            (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * videoPlayerRef.current!.duration
        videoPlayerRef.current!.currentTime = scrubTime
    }

    useEffect(() => {
        const videoPlayer = videoPlayerRef.current
        function updateCurrentTime() {
            if (videoPlayer) {
                setIsCurrentTime(videoPlayer.currentTime)
                setTotalDuration(videoPlayer.duration)
                const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100
                setProgress(percent)


                if (videoPlayer.currentTime >= videoPlayer.duration) {
                    setIsVideoPlaying(false);
                }
            }
        }
        videoPlayerRef.current?.addEventListener("timeupdate", updateCurrentTime)

        //scrub to work on everypart of the screen

        function handleMouseMove(e: MouseEvent) {
            if (mousedown) {
                const scrubTime = (e.clientX / window.innerWidth) * videoPlayerRef.current!.duration
                videoPlayerRef.current!.currentTime = scrubTime
            }
        }

        const doc = documentRef.current
        if (doc) {
            doc.addEventListener("mouseup", () => {
                if (mousedown) {
                    setMousedown(false)
                    doc.removeEventListener("mousemove", handleMouseMove)
                }
            })

            doc.addEventListener("mousemove", handleMouseMove)
        }


        return () => {
            videoPlayerRef.current?.removeEventListener("timeupdate", updateCurrentTime)
            if (doc) {
                doc.removeEventListener("mousemove", handleMouseMove)
            }
        }
    }, [mousedown])

    const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value)
    }

    const isImageBase64 = commentAuthorImg && commentAuthorImg.length > 100

    useEffect(() => {
        let timer: number
        if (showMessage) {
            timer = setTimeout(() => {
                setShowMessage(false)
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [showMessage])

    const toggleCaptions = () => {
        setIsAreCaptionsActive(!areCaptionsActive)
        setShowMessage(true)
    }

    return (
        <>
            <video className="watch-player" ref={videoPlayerRef} width={1920}  >
                <source src="/exampleVid/videoplayback.mp4" />
            </video>
            <motion.div className="video-controls"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="video-progress-bar"
                    ref={progressRef}
                    onClick={scrub}
                    onMouseMove={(e) => {
                        if (mousedown) {
                            scrub(e)
                        }
                    }}
                    onMouseDown={() => setMousedown(true)}
                    onMouseUp={() => setMousedown(false)}
                >
                    <div className="video-progress-bar__filled" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="video-controls__wrap">
                    <div className="video-time">
                        <p>
                            <span className="current-time">{formatTime(currentTime)}  </span>
                            /
                            <span className="total-time"> {formatTime(totalDuration)}</span>
                        </p>
                    </div>
                    <div className="play-pause-container">
                        <button className="play-pause-cta-button" onClick={handleBackwardButton}>
                            <svg className="backwards-btn-svg" width="29" height="25" viewBox="0 0 29 25">
                                <path d="M15.1931 0C15.455 0.00157669 15.7133 0.0625867 15.9489 0.178568C16.2177 0.339455 16.4327 0.578731 16.5659 0.865322C16.6991 1.15191 16.7445 1.47258 16.696 1.78567L16.696 7.76765L26.214 0.37499C26.4667 0.171784 26.7708 0.0454782 27.0913 0.0107136C27.4117 -0.0240511 27.7353 0.0341497 28.0245 0.178568C28.3186 0.327074 28.566 0.556358 28.7384 0.840418C28.9108 1.12448 29.0014 1.45194 29 1.78567L29 23.2137C29.0014 23.5474 28.9108 23.8749 28.7384 24.1589C28.566 24.443 28.3186 24.6723 28.0245 24.8208C27.7355 24.9663 27.4117 25.025 27.0911 24.9903C26.7704 24.9555 26.4662 24.8285 26.214 24.6243L16.696 17.2406V23.2137C16.7426 23.5254 16.6964 23.8441 16.5632 24.1289C16.4301 24.4137 16.2162 24.6515 15.9489 24.8118C15.66 24.9573 15.3362 25.0161 15.0156 24.9813C14.6949 24.9465 14.3907 24.8196 14.1385 24.6154L0.67441 13.9014C0.464324 13.7344 0.29442 13.521 0.177572 13.2773C0.0607249 13.0337 0 12.7662 0 12.4952C0 12.2242 0.0607249 11.9567 0.177572 11.7131C0.29442 11.4694 0.464324 11.256 0.67441 11.089L14.1385 0.37499C14.4405 0.136787 14.8108 0.00513505 15.1931 0Z" />
                            </svg>
                        </button>
                        <button className="play-pause-cta-button main" onClick={handlePlayButton}>
                            {!isVideoPlaying ? <svg width="42" height="47" viewBox="0 0 42 47" className="play-btn-svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M38.1903 30.1277C43.2893 27.1815 43.2893 19.8193 38.1903 16.8701L12.1437 1.81179C7.04157 -1.1374 0.65625 2.54679 0.65625 8.4421V38.5587C0.65625 44.454 7.04157 48.1382 12.1437 45.186L38.1903 30.1277Z" />
                            </svg> : <FontAwesomeIcon className="play-btn-svg" icon={faPause} />}

                        </button>
                        <button className="play-pause-cta-button" onClick={handleForwardButton}>
                            <svg className="forwards-btn-svg" width="29" height="25" viewBox="0 0 29 25">
                                <path d="M13.8069 25C13.545 24.9984 13.2867 24.9374 13.0511 24.8214C12.7823 24.6605 12.5673 24.4213 12.4341 24.1347C12.3009 23.8481 12.2555 23.5274 12.304 23.2143V17.2323L2.786 24.625C2.53334 24.8282 2.22917 24.9545 1.90874 24.9893C1.58831 25.0241 1.26475 24.9659 0.975549 24.8214C0.681362 24.6729 0.434027 24.4436 0.261599 24.1596C0.0891712 23.8755 -0.00144908 23.5481 1.75233e-05 23.2143V1.78633C-0.00144908 1.45261 0.0891712 1.12514 0.261599 0.841082C0.434027 0.557023 0.681362 0.327736 0.975549 0.17923C1.26449 0.0337477 1.58826 -0.0250448 1.90891 0.00974447C2.22957 0.0445338 2.53382 0.171463 2.786 0.375654L12.304 7.75939V1.78633C12.2574 1.47463 12.3036 1.15589 12.4368 0.871091C12.5699 0.586293 12.7838 0.348456 13.0511 0.188159C13.34 0.0426763 13.6638 -0.0161163 13.9844 0.018673C14.3051 0.0534623 14.6093 0.180392 14.8615 0.384582L28.3256 11.0986C28.5357 11.2656 28.7056 11.479 28.8224 11.7227C28.9393 11.9663 29 12.2338 29 12.5048C29 12.7758 28.9393 13.0433 28.8224 13.2869C28.7056 13.5306 28.5357 13.744 28.3256 13.911L14.8615 24.625C14.5595 24.8632 14.1892 24.9949 13.8069 25Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="player-other-controls">
                        <button className="other-controls-cta-button" >
                            <svg className="other-cta-btn" width="48" height="55" viewBox="0 0 48 55">
                                <path d="M42.0317 10.3121L35.7525 2.19961L44.7588 0.412109L46.5463 9.39544L42.0317 10.3121ZM35.2942 11.6184L29.015 3.52878L24.5004 4.42253L30.8025 12.5121L35.2942 11.6184ZM24.065 13.8642L17.7859 5.72878L13.2713 6.66836L19.5734 14.7579L24.065 13.8642ZM6.53378 8.02044L4.28795 8.45586C3.69761 8.57227 3.13605 8.80407 2.63548 9.13796C2.13492 9.47186 1.70518 9.90128 1.37092 10.4016C1.03666 10.9019 0.804454 11.4633 0.687611 12.0536C0.570769 12.6438 0.571591 13.2513 0.69003 13.8413L1.58378 18.3329L12.8129 16.11L6.53378 8.02044ZM47.4171 18.3329V41.2496C47.4171 43.7934 45.3775 45.8329 42.8338 45.8329H6.16711C4.95154 45.8329 3.78575 45.3501 2.92621 44.4905C2.06667 43.631 1.58378 42.4652 1.58378 41.2496V18.3329H47.4171ZM42.8338 22.9163H6.16711V41.2496H42.8338V22.9163ZM13.0421 54.9996H17.6254V50.4163H13.0421V54.9996ZM31.3754 54.9996H35.9588V50.4163H31.3754V54.9996ZM22.2088 54.9996H26.7921V50.4163H22.2088V54.9996Z" />
                            </svg>
                        </button>
                        <button
                            onClick={toggleCaptions}
                            className="other-controls-cta-button">
                            <svg className="other-cta-btn" width="47" height="37" viewBox="0 0 47 37">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.583008 18.4993C0.583008 9.85747 0.583008 5.53539 3.26884 2.85185C5.95238 0.166015 10.2745 0.166016 18.9163 0.166016H28.083C36.7249 0.166016 41.047 0.166015 43.7305 2.85185C46.4163 5.53539 46.4163 9.85747 46.4163 18.4993C46.4163 27.1412 46.4163 31.4633 43.7305 34.1468C41.047 36.8327 36.7249 36.8327 28.083 36.8327H18.9163C10.2745 36.8327 5.95238 36.8327 3.26884 34.1468C0.583008 31.4633 0.583008 27.1412 0.583008 18.4993ZM9.74967 25.9473C9.29383 25.9473 8.85666 26.1283 8.53433 26.4507C8.21201 26.773 8.03092 27.2102 8.03092 27.666C8.03092 28.1219 8.21201 28.559 8.53433 28.8814C8.85666 29.2037 9.29383 29.3848 9.74967 29.3848H18.9163C19.3722 29.3848 19.8094 29.2037 20.1317 28.8814C20.454 28.559 20.6351 28.1219 20.6351 27.666C20.6351 27.2102 20.454 26.773 20.1317 26.4507C19.8094 26.1283 19.3722 25.9473 18.9163 25.9473H9.74967ZM13.7601 20.791C13.7601 20.3352 13.579 19.898 13.2567 19.5757C12.9344 19.2533 12.4972 19.0723 12.0413 19.0723H9.74967C9.29383 19.0723 8.85666 19.2533 8.53433 19.5757C8.21201 19.898 8.03092 20.3352 8.03092 20.791C8.03092 21.2469 8.21201 21.684 8.53433 22.0064C8.85666 22.3287 9.29383 22.5098 9.74967 22.5098H12.0413C12.4972 22.5098 12.9344 22.3287 13.2567 22.0064C13.579 21.684 13.7601 21.2469 13.7601 20.791ZM22.3538 19.0723C22.8097 19.0723 23.2469 19.2533 23.5692 19.5757C23.8915 19.898 24.0726 20.3352 24.0726 20.791C24.0726 21.2469 23.8915 21.684 23.5692 22.0064C23.2469 22.3287 22.8097 22.5098 22.3538 22.5098H17.7705C17.3147 22.5098 16.8775 22.3287 16.5552 22.0064C16.2328 21.684 16.0518 21.2469 16.0518 20.791C16.0518 20.3352 16.2328 19.898 16.5552 19.5757C16.8775 19.2533 17.3147 19.0723 17.7705 19.0723H22.3538ZM38.9684 20.791C38.9684 20.3352 38.7873 19.898 38.465 19.5757C38.1427 19.2533 37.7055 19.0723 37.2497 19.0723H28.083C27.6272 19.0723 27.19 19.2533 26.8677 19.5757C26.5453 19.898 26.3643 20.3352 26.3643 20.791C26.3643 21.2469 26.5453 21.684 26.8677 22.0064C27.19 22.3287 27.6272 22.5098 28.083 22.5098H37.2497C37.7055 22.5098 38.1427 22.3287 38.465 22.0064C38.7873 21.684 38.9684 21.2469 38.9684 20.791ZM24.6455 25.9473C24.1897 25.9473 23.7525 26.1283 23.4302 26.4507C23.1078 26.773 22.9268 27.2102 22.9268 27.666C22.9268 28.1219 23.1078 28.559 23.4302 28.8814C23.7525 29.2037 24.1897 29.3848 24.6455 29.3848H28.083C28.5388 29.3848 28.976 29.2037 29.2983 28.8814C29.6207 28.559 29.8018 28.1219 29.8018 27.666C29.8018 27.2102 29.6207 26.773 29.2983 26.4507C28.976 26.1283 28.5388 25.9473 28.083 25.9473H24.6455ZM32.0934 27.666C32.0934 27.2102 32.2745 26.773 32.5968 26.4507C32.9192 26.1283 33.3563 25.9473 33.8122 25.9473H37.2497C37.7055 25.9473 38.1427 26.1283 38.465 26.4507C38.7873 26.773 38.9684 27.2102 38.9684 27.666C38.9684 28.1219 38.7873 28.559 38.465 28.8814C38.1427 29.2037 37.7055 29.3848 37.2497 29.3848H33.8122C33.3563 29.3848 32.9192 29.2037 32.5968 28.8814C32.2745 28.559 32.0934 28.1219 32.0934 27.666Z" />
                            </svg>

                        </button>
                        <div className="volume-wrap">
                            <button className="other-controls-cta-button" onClick={() => setIsVolueRangeVisible(prev => !prev)}>
                                <svg className="other-cta-btn " width="52" height="43" viewBox="0 0 52 43" >
                                    <path d="M36.8521 12.6244C40.2173 17.1333 40.2173 25.8669 36.8521 30.3757M44.4258 3.74882C54.4939 13.4055 54.5545 29.6581 44.4258 39.2513M1.50781 29.0038V13.9938C1.50781 12.5382 2.63883 11.3565 4.0324 11.3565H13.0856C13.4197 11.3553 13.7501 11.2862 14.0568 11.1532C14.3636 11.0203 14.6404 10.8263 14.8705 10.5831L22.4442 1.99144C24.0347 0.327896 26.7537 1.50709 26.7537 3.85786V39.1423C26.7537 41.5108 24.0019 42.6799 22.4215 40.9834L14.873 32.4399C14.6422 32.1897 14.3626 31.9899 14.0517 31.8529C13.7407 31.7159 13.405 31.6447 13.0654 31.6437H4.0324C2.63883 31.6437 1.50781 30.4619 1.50781 29.0038Z" />
                                </svg>
                            </button>
                            {isVolumeRangeVisible ?
                                <input
                                    className="volume-range"
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                /> :
                                ''}
                        </div>
                        <button className="other-controls-cta-button"
                            onClick={() => setIsCommentBoxVisible(prev => !prev)}
                        >
                            <svg className="other-cta-btn" width="56" height="52" viewBox="0 0 56 52">
                                <path d="M21.5385 0C9.79354 0 0 8.07692 0 18.3077C0 23.5415 2.86462 28.1034 6.93323 31.4332C6.67052 33.2025 5.95118 34.8728 4.84615 36.2794C4.39519 36.8566 3.92392 37.4177 3.43323 37.9615C3.17922 38.2292 2.95332 38.5222 2.75908 38.836C2.63631 39.0363 2.44462 39.2603 2.35631 39.7126C2.26585 40.1628 2.38862 40.9037 2.75908 41.4615L3.02831 41.9332L3.56677 42.2025C5.45138 43.1437 7.48677 42.9778 9.35631 42.4717C11.2237 41.9634 13.02 41.0932 14.7409 40.1822C16.4597 39.2732 18.0945 38.3212 19.3846 37.6255C19.5655 37.5286 19.6818 37.5049 19.8563 37.4231C23.2529 42.0926 29.4732 45.2308 36.4129 45.2308C36.4797 45.2394 36.5422 45.2308 36.6154 45.2308C39.4154 45.2308 48.4615 54.4794 53.8461 50.8178C54.0615 49.9585 49.112 47.8025 48.8643 41.3948C53.0794 38.416 55.7997 33.9855 55.7997 29.0769C55.7997 21.8142 50.036 15.8135 42.3382 13.664C39.9021 5.73785 31.4332 0 21.5385 0ZM21.5385 4.30769C31.332 4.30769 38.7692 10.8769 38.7692 18.3077C38.7692 25.7385 31.332 32.3077 21.5385 32.3077C19.7895 32.3077 18.7858 33.0228 17.3643 33.7895C15.9428 34.5542 14.3123 35.504 12.7206 36.3462C11.3422 37.0742 10.0283 37.6342 8.81785 38.0283C9.996 36.3268 11.2258 34.0889 11.4412 30.9615L11.5102 29.7489L10.5 29.0102C6.66185 26.32 4.30769 22.4495 4.30769 18.3077C4.30769 10.8769 11.7449 4.30769 21.5385 4.30769Z" />
                            </svg>
                        </button>
                        <div className={`movie-comments-box ${isCommentBoxVisible ? 'visible' : ''}`}>
                            {currentMediaItem.comments.map((el, idx) => {
                                const isVisible = (videoPlayerRef.current?.currentTime ?? 0) <= el.time + 3 &&
                                    (videoPlayerRef.current?.currentTime ?? 0) >= el.time - 6
                                return (
                                    isVisible ?
                                        <motion.div
                                            className="movie-comment-item"
                                            key={`${el.id}-${idx}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 1 } }}
                                            exit={{ opacity: 0, transition: { duration: 1 } }}
                                        >
                                            <div className="comment-from">
                                                <div className="comment-from__img-box">
                                                    {isImageBase64 && el.image && el.image.length > 100 ? (
                                                        <img src={`data:image/png;base64,${el.image}`} alt="user-img" />
                                                    ) : (
                                                        <img src={el.image} alt="user-img" />
                                                    )}
                                                </div>
                                                <span>{el.user}</span>
                                            </div>
                                            <p className="comment-text">
                                                {el.text}
                                            </p>
                                        </motion.div>
                                        : null
                                )
                            })}
                            <div className="leave-a-comment-box">
                                <textarea className="comment-watch-area"
                                    name="comment-watch-area"
                                    id="comment-watch-area"
                                    maxLength={50}
                                    placeholder="Your thoughts?"
                                    value={commentText}
                                    onChange={handleChangeComment}
                                ></textarea>
                                <button
                                    onClick={handleConfirm}
                                    className="comment-btn">
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="captions-box">
                    <AnimatePresence>
                        {showMessage && (
                            <motion.p
                                key="caption"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5 }}
                            >
                                {areCaptionsActive ? 'Captions enabled' : 'Captions disabled'}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div >
        </>
    )
}