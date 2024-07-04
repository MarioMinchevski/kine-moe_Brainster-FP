import { useState } from "react";
import { CommentReplyItem } from "./CommentReplyItem";
import { PostComment } from "./types";
import { motion } from "framer-motion"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replyToComment } from "../../utils/replyToComment";
import { UserType } from "../../SharedTypes/SharedTypes";

export function CommentItem({ commentAuthorImg, commentAuthorName, commentLikes, commentReplies, commentText, postCommentId, isOpen, onToggleCommentReply, id, handleCloseComment }: PostComment) {
    const queryClient = useQueryClient()

    const [commentReplyText, setCommentReplyText] = useState(`@${commentAuthorName}`)
    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false)
    const [commentToReplyTo, setCommentToReplyTo] = useState<number>(0) // inital ID can be 0 since there will never be an id that is 0

    // state that will be passed down to replies to make sure only one of them can be opened

    const [openReplyIndex, setOpenReplyIndex] = useState<null | number>(null)

    const handleToggleReply = (idx: number) => {
        setOpenReplyIndex(prevIndex => prevIndex === idx ? null : idx)
    }

    const currentUserString = localStorage.getItem('user')
    let currentUser: UserType | null = null

    if (currentUserString) {
        currentUser = JSON.parse(currentUserString);
    }

    const commentAuthorReplyImg = currentUser?.image
    const commentAuthorReplyName = currentUser?.username

    const addCommentReplyMutation = useMutation({
        mutationFn: replyToComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })

    const handleConfirm = async (commentToReplyTo: number) => {
        try {
            if (!commentReplyText.trim()) {
                setIsErrorMessageVisible(true)
                return
            }

            const idAsString = id!.toString()

            if (id)
                await addCommentReplyMutation.mutateAsync({ id: idAsString, commentReplyText, commentAuthorReplyImg, commentAuthorReplyName, postCommentId: commentToReplyTo })
            setCommentReplyText('')
            setCommentToReplyTo(0)
            onToggleCommentReply(null)
            setIsErrorMessageVisible(false)
        } catch (err) {
            console.log("Error adding comment reply", err)
        }
    }

    const handleChangeCommentReply = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentReplyText(event.target.value)
    }

    // handling the the comment reply box toggle

    const handleCommentReplyToggle = () => {
        if (isOpen) {
            setCommentToReplyTo(0)
            onToggleCommentReply(null)
            console.log(postCommentId)
        } else {
            setCommentToReplyTo(postCommentId)
            onToggleCommentReply(true)
            console.log(postCommentId)
        }
    }

    // prop drilling funcs to handle closeing the reply box

    const handleReplyToReplyCloseTextBox = () => {
        setCommentToReplyTo(0)
    }

    const handleReplyToReplyToggle = () => {
        handleCloseComment()
    }

    const handleReplyToReplyCommentIdSelection = () => {
        setCommentToReplyTo(postCommentId)
    }

    const isImageBase64 = commentAuthorImg.length > 100

    return (
        <div className="comments-item">
            <div className="comment-item__inner-wrap">
                <div className="comments-item__posted-by-wrap">
                    <div className="post-author-img-box">
                        {isImageBase64 ? (
                            <img src={`data:image/png;base64,${commentAuthorImg}`} alt="user-img" className="post-author-img" />
                        ) : (
                            <img src={commentAuthorImg} alt="user-img" className="post-author-img" />
                        )}
                    </div>
                    <div className="comments-item__posted-by-wrap__inner-wrap">
                        <span className="comment-by-user">{commentAuthorName}</span>
                        <p className="comments-title">{commentText}</p>
                    </div>
                </div>
                <div className="comments-item__reactions-wrap">
                    <div className="reactions-wrap__inner">
                        <button
                            onClick={handleCommentReplyToggle}
                            className="reply-button">
                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_70_1914)">
                                    <path d="M12.0873 -0.5C5.49609 -0.5 0 4.03273 0 9.77419C0 12.7114 1.60761 15.2715 3.8909 17.1402C3.74347 18.1331 3.33978 19.0705 2.71964 19.8598C2.46656 20.1838 2.20209 20.4986 1.92671 20.8038C1.78417 20.9541 1.65739 21.1185 1.54838 21.2946C1.47948 21.407 1.37191 21.5327 1.32235 21.7865C1.27158 22.0392 1.34048 22.455 1.54838 22.768L1.69947 23.0327L2.00165 23.1838C3.05929 23.712 4.20154 23.619 5.25072 23.3349C6.29868 23.0497 7.30676 22.5613 8.27254 22.05C9.2371 21.54 10.1545 21.0057 10.8786 20.6153C10.9801 20.5609 11.0454 20.5476 11.1433 20.5017C13.0494 23.1222 16.5402 24.8833 20.4348 24.8833C20.4722 24.8881 20.5073 24.8833 20.5484 24.8833C22.1197 24.8833 27.1964 30.0736 30.2182 28.0187C30.3391 27.5365 27.5614 26.3265 27.4224 22.7306C29.7879 21.0589 31.3145 18.5725 31.3145 15.8178C31.3145 11.742 28.08 8.37448 23.76 7.16817C22.3929 2.72005 17.6402 -0.5 12.0873 -0.5ZM12.0873 1.91746C17.5834 1.91746 21.7571 5.60408 21.7571 9.77419C21.7571 13.9443 17.5834 17.6309 12.0873 17.6309C11.1058 17.6309 10.5425 18.0322 9.74477 18.4625C8.94701 18.8916 8.032 19.4247 7.13875 19.8973C6.36516 20.3058 5.62784 20.6201 4.94853 20.8413C5.60971 19.8864 6.29989 18.6305 6.42077 16.8755L6.45944 16.195L5.89255 15.7804C3.7386 14.2707 2.41746 12.0986 2.41746 9.77419C2.41746 5.60408 6.5912 1.91746 12.0873 1.91746Z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="reactions-wrap__inner-alt">
                        <button className="like-button">
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8V20H0V8H4ZM8 20C7.46957 20 6.96086 19.7893 6.58579 19.4142C6.21071 19.0391 6 18.5304 6 18V8C6 7.45 6.22 6.95 6.59 6.59L13.17 0L14.23 1.06C14.5 1.33 14.67 1.7 14.67 2.11L14.64 2.43L13.69 7H20C20.5304 7 21.0391 7.21071 21.4142 7.58579C21.7893 7.96086 22 8.46957 22 9V11C22 11.26 21.95 11.5 21.86 11.73L18.84 18.78C18.54 19.5 17.83 20 17 20H8ZM8 18H17.03L20 11V9H11.21L12.34 3.68L8 8.03V18Z" />
                            </svg>
                        </button>
                        <span className="likes-num">{commentLikes}</span>
                    </div>
                </div>
            </div>
            {commentReplies.map((el, idx) =>
                <CommentReplyItem
                    {...el}
                    key={`${el.commentReplyId}-${idx}`}
                    isOpen={openReplyIndex === idx}
                    onToggleReply={() => handleToggleReply(idx)}
                    id={id}
                    postCommentId={commentToReplyTo}
                    onHandleReplyToReplyCloseTextBox={handleReplyToReplyCloseTextBox}
                    onHandleReplyToReplyToggle={handleReplyToReplyToggle}
                    onHandleReplyToReplyCommentIdSelection={handleReplyToReplyCommentIdSelection}
                />
            )}
            {isOpen &&
                <motion.div
                    className="reply-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <textarea name="reply-to-comment" id="reply-to-comment"
                        onChange={handleChangeCommentReply}
                        value={commentReplyText}
                    >{commentAuthorName}</textarea>
                    <button
                        onClick={() => handleConfirm(commentToReplyTo)}
                        className="submit-reply-btn">Reply
                    </button>
                    <div className={`error-message-reply ${isErrorMessageVisible ? 'show' : ''}`}>
                        <p>Please fill in the comment field.</p>
                    </div>
                </motion.div>}
        </div>
    )
}