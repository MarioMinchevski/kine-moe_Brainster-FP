type PostCommentWatchType = {
    id: string
    commentText: string
    commentAuthorImg: string | undefined
    commentAuthorName: string | undefined
    currentTime: number
}

export async function postCommentOnWatch({ id, commentText, commentAuthorImg, commentAuthorName, currentTime }: PostCommentWatchType) {
    console.log(id)
    const response = await fetch(`http://localhost:3001/dummyMoviesData/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch post')
    }

    const movie = await response.json()

    if (!movie.comments) {
        movie.comments = []
    }

    let commentId = (Math.random().toString().slice(2), 10)

    movie.comments.push({
        id: commentId,
        text: commentText,
        image: commentAuthorImg,
        user: commentAuthorName,
        time: currentTime
    })

    const updatedPostBody = {
        ...movie,
    }

    const updateResponse = await fetch(`http://localhost:3001/dummyMoviesData/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedPostBody),
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to add comment');
    }
}