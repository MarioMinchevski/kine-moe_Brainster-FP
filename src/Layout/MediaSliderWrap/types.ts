import { MediaItemType } from "../../SharedTypes/SharedTypes"

export type MediaSliderWrapType = {
    title: string,
    content: MediaItemType[]
    extraClass?: string
    idx?: number
    isUnique?: boolean
}
