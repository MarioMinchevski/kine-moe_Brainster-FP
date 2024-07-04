import { Link } from "react-router-dom";
import { DiscussionItemType } from "./types";
import { useState } from "react";

export function DiscussionItem({ authorImg, id, postDislikes, postLike, postTitle }: DiscussionItemType) {
    const [userLike, setUserLike] = useState<boolean>(false)
    const [userDislike, setUserDislike] = useState<boolean>(false)

    const isImageBase64 = authorImg.length > 100

    const handleLikeClick = () => {
        if (userLike) {
            setUserLike(false)
        } else {
            setUserLike(true)
            setUserDislike(false)
        }
    }

    const handleDislikeClick = () => {
        if (userDislike) {
            setUserDislike(false)
        } else {
            setUserDislike(true)
            setUserLike(false)
        }
    }

    return (
        <Link to={`/community-page/post/${id}`} className="discussions-item">
            <div className="dicussion-item__posted-by-wrap">
                <div className="post-author-img-box">
                    {isImageBase64 ? (
                        <img src={`data:image/png;base64,${authorImg}`} alt="user-img" className="post-author-img" />
                    ) : (
                        <img src={authorImg} alt="user-img" className="post-author-img" />
                    )}
                </div>
                <p className="discussion-title">{postTitle}</p>
            </div>
            <div className="discussion-item__reactions-wrap">
                <div className="reactions-wrap__inner">
                    <button
                        className={`like-button ${userLike ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault()
                            handleLikeClick()
                        }}
                    >
                        {!userLike ? <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 8V20H0V8H4ZM8 20C7.46957 20 6.96086 19.7893 6.58579 19.4142C6.21071 19.0391 6 18.5304 6 18V8C6 7.45 6.22 6.95 6.59 6.59L13.17 0L14.23 1.06C14.5 1.33 14.67 1.7 14.67 2.11L14.64 2.43L13.69 7H20C20.5304 7 21.0391 7.21071 21.4142 7.58579C21.7893 7.96086 22 8.46957 22 9V11C22 11.26 21.95 11.5 21.86 11.73L18.84 18.78C18.54 19.5 17.83 20 17 20H8ZM8 18H17.03L20 11V9H11.21L12.34 3.68L8 8.03V18Z" />
                        </svg> : <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 8L4 20L3.49691e-06 20L1.39876e-06 8L4 8ZM8 20C7.46957 20 6.96086 19.7893 6.58579 19.4142C6.21072 19.0391 6 18.5304 6 18L6 8C6 7.45 6.22 6.95 6.59 6.59L13.17 -2.30272e-06L14.23 1.06C14.5 1.33 14.67 1.7 14.67 2.11L14.64 2.43L13.69 7L20 7C20.5304 7 21.0391 7.21071 21.4142 7.58578C21.7893 7.96086 22 8.46956 22 9L22 11C22 11.26 21.95 11.5 21.86 11.73L18.84 18.78C18.54 19.5 17.83 20 17 20L8 20ZM8 18L17.03 18L20 11L20 9L11.21 9L12.34 3.68L8 8.03L8 18Z" fill="#519C3C" />
                            <path d="M7 7.5L12.5 2.5H13.5L12.5 8H20.5L21 10L20 13L16.5 19H7V7.5Z" fill="#519C3C" />
                        </svg>
                        }

                    </button>
                    <span className="likes-num">{postLike + (userLike ? 1 : 0)}</span>
                </div>
                <div className="reactions-wrap__inner">
                    <button
                        className={`dislike-button ${userDislike ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault()
                            handleDislikeClick()
                        }}
                    >
                        {!userDislike ? <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 12L18 0H22L22 12H18ZM14 0C14.5304 0 15.0391 0.210714 15.4142 0.585787C15.7893 0.960859 16 1.46957 16 2V12C16 12.55 15.78 13.05 15.41 13.41L8.83 20L7.77 18.94C7.5 18.67 7.33 18.3 7.33 17.89L7.36 17.57L8.31 13L2 13C1.46957 13 0.960859 12.7893 0.585787 12.4142C0.210714 12.0391 0 11.5304 0 11V9C0 8.74 0.0499992 8.5 0.139999 8.27L3.16 1.22C3.46 0.5 4.17 0 5 0L14 0ZM14 2L4.97 2L2 9V11H10.79L9.66 16.32L14 11.97L14 2Z" />
                        </svg> : <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 12L18 1.04907e-06L22 0L22 12L18 12ZM14 2.09815e-06C14.5304 1.95903e-06 15.0391 0.210716 15.4142 0.585789C15.7893 0.960861 16 1.46957 16 2L16 12C16 12.55 15.78 13.05 15.41 13.41L8.83 20L7.77 18.94C7.5 18.67 7.33 18.3 7.33 17.89L7.36 17.57L8.31 13L2 13C1.46957 13 0.960858 12.7893 0.585785 12.4142C0.210712 12.0391 -2.2213e-06 11.5304 -2.36042e-06 11L-2.88495e-06 9.00001C-2.95314e-06 8.74001 0.0499964 8.50001 0.139996 8.27001L3.15999 1.22C3.45999 0.500004 4.16999 4.67624e-06 4.99999 4.45856e-06L14 2.09815e-06ZM14 2L4.96999 2L2 9.00001L2 11L10.79 11L9.66 16.32L14 11.97L14 2Z" fill="#FF0000" />
                            <path d="M15 12.5L9.5 17.5L8.5 17.5L9.5 12L1.5 12L0.999999 10L2 7L5.5 1L15 1L15 12.5Z" fill="#FF0000" />
                        </svg>
                        }
                    </button>
                    <span className="likes-num">{postDislikes + (userDislike ? 1 : 0)}</span>
                </div>
            </div>
        </Link>
    )
}