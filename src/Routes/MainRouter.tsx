import { useEffect } from "react"
import { useUserLoggedInContext } from "../Context/UserLoggedInContext"
import { AuthorizedRoutes } from "./AuthorizedRoutes"
import { UnauthorizedRoutes } from "./UnauthorizedRoutes"

export function MainRouter() {
    const { isUserLoggedIn, logUserOut } = useUserLoggedInContext()

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (!user) {
            logUserOut()
            console.log('user')
        } else {
            console.log('neshto')
        }

    }, [isUserLoggedIn])

    if (isUserLoggedIn) {
        return <AuthorizedRoutes />
    } else {
        return <UnauthorizedRoutes />
    }
}