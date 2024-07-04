type AddPostType = {
    postTitle: string
    postText: string
    authorImg: string | undefined
}

export async function addPost({ postTitle, postText, authorImg, }: AddPostType) {
    const commentId = Math.random().toString().slice(2)

    const postPayload = {
        id: commentId,
        postTitle: postTitle,
        postText: postText,
        authorImg,
        postLike: 0,
        postDislikes: 0,
        postComments: [],
    }

    const response = await fetch(`http://localhost:3001/posts/`, {
        method: "POST",

        body: JSON.stringify(postPayload),
    })

    if (!response.ok) {
        throw new Error('Failed to add post');
    }
}