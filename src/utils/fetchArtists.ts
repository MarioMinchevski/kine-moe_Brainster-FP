import { ArtistItemType } from "../SharedTypes/SharedTypes";

export async function fetchArtists(): Promise<ArtistItemType[]> {
    const response = await fetch('http://localhost:3001/artistData')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data: ArtistItemType[] = await response.json()
    return data
}