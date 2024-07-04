import { HeaderLogo } from "./components/HeaderLogo";
import { Heading } from "./components/Heading";
import { HomepageHeaderFilmCardContainer } from "./components/HomepageHeaderFilmCardContainer";
import { SignInBtn } from "./components/SignInBtn";

export function LandingPageHeader() {
    return (
        <header className="landing-page-header">
            <HeaderLogo />
            <Heading />
            <SignInBtn />
            <HomepageHeaderFilmCardContainer />
        </header>
    )
}