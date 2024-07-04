import { MediaItemType } from "../SharedTypes/SharedTypes";

export async function fetchAllMediaItems(): Promise<MediaItemType[]> {
    const res = await fetch('http://localhost:3001/dummyMoviesData')
    if (!res.ok) {
        throw new Error('Something went wrong, try again')
    }

    const data: MediaItemType[] = await res.json()

    return data
}