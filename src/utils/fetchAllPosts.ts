import { DiscussionItemType } from "../Layout/Community/types";

export async function fetchAllPosts(): Promise<DiscussionItemType[]> {
    const response = await fetch('http://localhost:3001/posts')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data: DiscussionItemType[] = await response.json()
    return data
}