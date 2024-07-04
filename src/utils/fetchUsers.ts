import { UserType } from "../SharedTypes/SharedTypes";

export async function fetchUsers(): Promise<UserType[]> {
    const res = await fetch('http://localhost:3001/users')
    if (!res.ok) {
        throw new Error('Something went wrong, try again')
    }

    const data: UserType[] = await res.json()
    return data
}