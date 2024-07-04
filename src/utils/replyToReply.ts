import { PostComment } from "../Layout/Community/types";

type replyToCommentType = {
    id: string
    commentReplyText: string
    commentAuthorReplyImg: string | undefined
    commentAuthorReplyName: string | undefined
    postCommentId: number
};

export async function replyToReply({ id, commentReplyText, commentAuthorReplyImg, commentAuthorReplyName, postCommentId }: replyToCommentType) {
    // Fetch the post to find the specific comment to reply to
    const response = await fetch(`http://localhost:3001/posts/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch post')
    }
    const post = await response.json()

    const commentIndex = post.postComments.findIndex((comment: PostComment) => comment.postCommentId === postCommentId)
    if (commentIndex === -1) {
        throw new Error('Comment not found')
    }

    // Generate a unique ID for the reply
    let commentReplyId = parseInt(Math.random().toString().slice(2), 10)

    // Add the reply to the comment's replies array
    post.postComments[commentIndex].commentReplies.push({
        id: commentReplyId,
        replyText: commentReplyText,
        replyAuthorImg: commentAuthorReplyImg,
        replyAuthorName: commentAuthorReplyName,
        replyLikes: 0
    })

    // Update the post with the new reply
    const updatedPostBody = { ...post }
    const updateResponse = await fetch(`http://localhost:3001/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPostBody),
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to add comment reply')
    }
}
