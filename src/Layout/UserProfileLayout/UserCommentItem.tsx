import { Link } from "react-router-dom";
import { CommentItemType } from "./type";

export function UserCommentItem({ comment, image, username, postId }: CommentItemType) {

    const isImageBase64 = image && image.length > 100

    return (
        <Link to={`http://localhost:5173/community-page/post/${postId}`} className="user-comment-item">
            <div className="comment-from">
                <div className="comment-from__user-img-box">
                    {isImageBase64 ? (
                        <img src={`data:image/png;base64,${image}`} alt="profile-pic" />
                    ) : (
                        <img src={image || "/userProfile/profile-picure.png"} alt="default-profile-pic" />
                    )}
                </div>
                <span className="comment-from__username">{username}</span>
            </div>
            <p className="comment-text">
                {comment}
            </p>
        </Link>
    )
}