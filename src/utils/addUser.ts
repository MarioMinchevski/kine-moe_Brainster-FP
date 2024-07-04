import { FormDataType } from "../Layout/CreateAccount/types";

export async function addUser(newUser: FormDataType) {
    const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
    })
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}