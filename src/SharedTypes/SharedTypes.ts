export type MediaItemType = {
    id: string
    title: string
    thumbnailImage: string
    headerImage: string
    description: string
    rating: number
    genres: string[]
    contentRating: string
    cast: string[]
    director: string
    writers: string[]
    producers: string[]
    cinematography: string
    editing: string
    costumeDesign: string
    comments: MediaCommentType[]
}

export type MediaCommentType = {
    id: string,
    text: string,
    time: number,
    user: string,
    image: string
}

export type ArtistItemType = {
    id: string,
    image: string,
    imageMain: string,
    nameAndSurname: string,
    description: string,
    movies: string[]
    awards: string[]
}

export type UserType = {
    id: number
    userType: string
    interests: string[]
    experiencePreferenceTutorial: string
    paymentType: string
    username: string
    password: number
    description: string
    image: string
    cultureInterests: string[]
    contentRecommendations: string[]
    emailNotification: boolean
    pushNotification: boolean
    noNotification: boolean
    privacySettings: string
    watchedMovies: number[]
    likedMovies: string[]
    userComments: Array<{
        postId: any,
        commentText: string
    }>
    userPosts: string[]
    email: string
}