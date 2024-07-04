import { MediaItemType } from "../SharedTypes/SharedTypes"

export async function fetchRandomMediaItems({ num }: { num: number }): Promise<MediaItemType[]> {
    const response = await fetch('http://localhost:3001/dummyMoviesData')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data: MediaItemType[] = await response.json()
    return getRandomItems(data, num)
}

function getRandomItems<T>(items: T[], count: number): T[] {
    const selectedItems = new Set<T>()
    while (selectedItems.size < count && selectedItems.size < items.length) {
        const randomIndex = Math.floor(Math.random() * items.length)
        selectedItems.add(items[randomIndex])
    }
    return Array.from(selectedItems)
}