import { useState, useEffect } from "react"
import { UserInfoDiagrams } from "../SharedComponents/UserInfoDiagrams/UserInfoDiagrams"
import { motion } from "framer-motion"

export function CommnityInfo() {
    const [diagramDiscussionScore, setDiagramDiscussionScore] = useState(0)
    const [diagramCommentScore, setDiagramCommentScore] = useState(0)

    const getRandomNumberInRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    useEffect(() => {
        setDiagramCommentScore(getRandomNumberInRange(25, 100))
        setDiagramDiscussionScore(getRandomNumberInRange(1, 20))
    }, [])

    return (
        <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
            className="community-info">
            <div className="comments-diagram">
                <UserInfoDiagrams score={diagramCommentScore} />
                <span>Comments</span>
            </div>
            <div className="discussion-diagram">
                <UserInfoDiagrams score={diagramDiscussionScore} />
                <span>Discussions</span>
            </div>
            <div className="latest-comments">
                <h4>Latest comments:</h4>
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