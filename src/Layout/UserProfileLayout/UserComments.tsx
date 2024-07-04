import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../SharedTypes/SharedTypes";
import { fetchUsers } from "../../utils/fetchUsers";
import { UserCommentItem } from "./UserCommentItem";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function UserComments() {
    const [currentUser, setCurrentUser] = useState<UserType>()

    const userInfoString = localStorage.getItem("user");
    const userInfo: UserType = userInfoString ? JSON.parse(userInfoString) : null

    const { username, image, id } = userInfo

    const { data: users, error: usersError, isLoading: usersLoading, isSuccess } = useQuery<UserType[]>({
        queryFn: fetchUsers,
        queryKey: ['users'],
    })

    useEffect(() => {
        if (isSuccess && users) {
            const user = users.find((item) => item.id === id)
            if (user)
                setCurrentUser(user)
        }
    }, [isSuccess, id, users])

    if (usersError || usersLoading) {
        <div>Loading...</div>
    }

    return (
        <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0, transition: { duration: 0.75 } }}
            className="user-comments">
            <h3 className="commments-from-title">Comments by {username}:</h3>
            <div className="user-comment__wrap">
                {currentUser?.userComments.length === 0 ? (
                    <p className="not-yet-commented">{username} has not commented yet.</p>
                ) : (
                    currentUser?.userComments.map((el, idx) =>
                        <UserCommentItem
                            key={`comment-item-key-${idx}`}
                            comment={el.commentText}
                            image={image}
                            username={username}
                            postId={el.postId}
                        />
                    )
                )}
            </div>
        </motion.div>
    )
}