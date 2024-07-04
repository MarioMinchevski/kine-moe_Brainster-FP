import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";
import { LandingPage } from "../Pages/LandingPage/LandingPage";
import { CreateAccountForm } from "../Pages/CreateAccountForm/CreateAccoutForm";

export function UnauthorizedRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<LandingPage />} />
            <Route
                path="/sign-in"
                element={<SignIn />} />
            <Route
                path="/sign-up"
                element={<SignUp />} />
            <Route
                path="/create-account"
                element={<CreateAccountForm />} />
            <Route
                path="*"
                element={<Navigate to="/" />} />
        </Routes>

    )
}