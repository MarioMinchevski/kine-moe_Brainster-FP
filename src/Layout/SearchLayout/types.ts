
import { MediaItemType } from "../../SharedTypes/SharedTypes"
import { MediaItemThumbnailType } from "../SharedComponents/MediaItemThumbnail/MediaItemThumbnail"

export type SimilarResultsType = {
    similarResults: MediaItemThumbnailType[]
    allMediaItems: MediaItemType[]
    generateRandomItems?: () => void
}

export type Movie = {
    id: number
    title: string
    genres: string[]
    img: string
}
