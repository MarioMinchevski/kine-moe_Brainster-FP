import { createContext, useContext } from "react";
import { UserLoggedInContextType } from "./UserLoggedInProvider";

export const UserLoggedInContext = createContext({} as UserLoggedInContextType)

export const useUserLoggedInContext = () => useContext(UserLoggedInContext)