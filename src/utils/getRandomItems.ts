export function getRandomItems<T>(items: T[], count: number): T[] {
    const selectedItems = new Set<T>()
    while (selectedItems.size < count && selectedItems.size < items.length) {
        const randomIndex = Math.floor(Math.random() * items.length)
        selectedItems.add(items[randomIndex])
    }
    return Array.from(selectedItems)
}