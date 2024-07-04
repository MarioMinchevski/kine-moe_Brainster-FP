import { motion } from "framer-motion"
import { PostComment } from "./types"
import { CommentItem } from "./CommentItem"
import { useState } from "react"

export function CommunityPagePostCommentSection({ comments, id }: { comments: PostComment[], id: string | undefined }) {

    // state that will be passed down to comments to make sure only one of them can be opened

    const [openCommentReplyIndex, setOpenCommentReplyIndex] = useState<null | number>(null)

    const handleToggleCommentReply = (idx: number) => {
        setOpenCommentReplyIndex(prevIndex => prevIndex === idx ? null : idx)
    }

    const handleCloseComment = () => {
        setOpenCommentReplyIndex(null)
    }

    return (
        comments.length > 0 &&
        <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0, transition: { duration: 0.5 } }}
            className="comment-section">
            <h2>Comment Section</h2>
            <div className="comment-sections__comments-box">
                {comments.map((el, idx) =>
                    <CommentItem
                        {...el}
                        key={`${el.id}-${idx}`}
                        isOpen={openCommentReplyIndex === idx}
                        onToggleCommentReply={() => handleToggleCommentReply(idx)}
                        id={id}
                        handleCloseComment={handleCloseComment}
                    />
                )}
            </div>
        </motion.div>
    )
}