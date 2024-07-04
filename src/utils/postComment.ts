type PostCommentType = {
    id: string
    commentText: string
    commentAuthorImg: string | undefined
    commentAuthorName: string | undefined
    commentAuthorId: number | undefined
}

export async function postComment({ id, commentText, commentAuthorImg, commentAuthorName, commentAuthorId }: PostCommentType) {

    const response = await fetch(`http://localhost:3001/posts/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch post')
    }

    const post = await response.json()

    if (!post.postComments) {
        post.postComments = []
    }

    let commentId = parseInt(Math.random().toString().slice(2), 10)

    post.postComments.push({
        postCommentId: commentId,
        commentText,
        commentAuthorImg,
        commentAuthorName,
        commentLikes: 0,
        commentReplies: []
    })

    const updatedPostBody = {
        ...post,
    }

    const updateResponse = await fetch(`http://localhost:3001/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedPostBody),
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to add comment');
    }

    // user updates 

    const userResponse = await fetch(`http://localhost:3001/users/${commentAuthorId}`);
    if (!userResponse.ok) {
        throw new Error('Failed to fetch user');
    }
    const user = await userResponse.json()

    if (!user.userComments) {
        user.userComments = []
    }

    user.userComments.push({ commentText, postId: id })

    const updatedUserBody = {
        ...user,
    }

    const updateUserResponse = await fetch(`http://localhost:3001/users/${commentAuthorId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedUserBody),
    })

    if (!updateUserResponse.ok) {
        throw new Error('Failed to update user comments')
    }
}