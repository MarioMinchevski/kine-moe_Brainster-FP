import { useState } from "react"
import { UserLoggedInContext } from "./UserLoggedInContext"

type UserLoggedInProviderType = {
    children: React.ReactNode
}

export type UserLoggedInContextType = {
    isUserLoggedIn: boolean

    logUserOut: () => void
    logUserIn: () => void

    isUserWelcomed: boolean
    welcomeUser: () => void
}

export function UserLoggedInProvider({ children }: UserLoggedInProviderType) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    const [isUserWelcomed, setIsUserWelcomed] = useState(false)


    const logUserOut = () => {
        setIsUserLoggedIn(false)
        localStorage.removeItem("user")
        setIsUserWelcomed(false)
    }

    const logUserIn = () => {
        setIsUserLoggedIn(true)
    }

    const welcomeUser = () => {
        setIsUserWelcomed(true)
    }


    return (
        <UserLoggedInContext.Provider value={{ isUserLoggedIn, logUserIn, logUserOut, isUserWelcomed, welcomeUser }}>
            {children}
        </UserLoggedInContext.Provider>
    )
}