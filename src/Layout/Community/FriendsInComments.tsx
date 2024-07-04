import { motion } from "framer-motion"

export function FriendsInComments() {
    return (
        <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
            className="friends-in-comments">
            <div className="latest-comments">
                <h4>Friends in this comment section:</h4>
                <div className="latest-comment-box">
                    <div className="latest-comment-from">
                        <div className="latest-comment-from__imb-box">
                            <img src="/communityPage/user-1.png" alt="user-img" />
                        </div>
                        <span className="latest-comment-from__user">Симе:</span>
                    </div>
                    <p className="latest-comment__text">
                        Колку добра сцена...
                    </p>
                </div>
                <div className="latest-comment-box">
                    <div className="latest-comment-from">
                        <div className="latest-comment-from__imb-box">
                            <img src="/communityPage/user-1.png" alt="user-img" />
                        </div>
                        <span className="latest-comment-from__user">Симе:</span>
                    </div>
                    <p className="latest-comment__text">
                        Колку добра сцена...
                    </p>
                </div>
            </div>
        </motion.div>
    )
}