export interface PostCommentReply {
    postCommentId: number
    id: String | undefined
    commentReplyId: number
    replyAuthorName: string
    replyAuthorImg: string
    replyText: string
    replyLikes: number
    isOpen: boolean
    onToggleReply: (isOpen: boolean | null) => void
    onHandleReplyToReplyCloseTextBox: () => void
    onHandleReplyToReplyToggle: () => void
    onHandleReplyToReplyCommentIdSelection: () => void
}

export interface PostComment {
    id: String | undefined
    postCommentId: number
    commentAuthorName: string
    commentAuthorImg: string
    commentText: string
    commentLikes: number
    commentReplies: PostCommentReply[]
    isOpen: boolean
    onToggleCommentReply: (isOpen: boolean | null) => void
    handleCloseComment: () => void
}

export interface DiscussionItemType {
    id: string
    authorImg: string
    postTitle: string
    postText: string
    postLike: number
    postDislikes: number
    postComments: PostComment[]
}

