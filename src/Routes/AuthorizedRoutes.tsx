import { Navigate, Route, Routes } from "react-router-dom";
import { ArtistOverview } from "../Pages/ArtistOverview/ArtistOverview";
import { CommunityPage } from "../Pages/CommunityPage/CommunityPage";
import { CommunityPagePost } from "../Pages/CommunityPagePost/CommunityPagePost";
import { Home } from "../Pages/Home/Home";
import { MovieOverview } from "../Pages/MovieOverview/MovieOverview";
import { Movies } from "../Pages/Movies/Movies";
import { NotFound } from "../Pages/NotFound/NotFound";
import { UserProfile } from "../Pages/UserProfile/UserProfile";
import { Watch } from "../Pages/Watch/Watch";
import { Search } from "../Pages/Search/Search";


export function AuthorizedRoutes() {
    return (
        <Routes>
            <Route
                path="/artist-overview/:id"
                element={<ArtistOverview />} />
            <Route
                path="/community-page"
                element={<CommunityPage />} />
            <Route
                path="/community-page/post/:id"
                element={<CommunityPagePost />} />
            <Route
                path="/home"
                element={<Home />} />
            <Route
                path="/movie-overview/:id"
                element={<MovieOverview />} />
            <Route
                path="/watch/:id"
                element={<Watch />} />
            <Route
                path="/movies"
                element={<Movies />} />
            <Route
                path="/search"
                element={<Search />} />
            <Route
                path="/user-profile"
                element={<UserProfile />} />
            <Route
                path="/"
                element={<Navigate to="/home" replace />} />
            <Route
                path="*"
                element={<NotFound />} />
        </Routes>

    )
}