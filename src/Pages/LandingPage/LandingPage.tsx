
import { ArtistLibrary } from "../../Layout/ArtistsLibrary/ArtistsLibrary";
import { HomepageFooter } from "../../Layout/HomepageFooter/HomepageFooter";
import { LandingPageHeader } from "../../Layout/LandingPageHeader/LandingPageHeader";
import { MovieBanner } from "../../Layout/MovieBanner/MovieBanner";
import { Pricing } from "../../Layout/Pricing/Pricing";
import { StreamingLibrary } from "../../Layout/StreamingLibrary/StreamingLibrary";

export function LandingPage() {
    return (
        <>
            <LandingPageHeader />
            <StreamingLibrary />
            <ArtistLibrary />
            <MovieBanner />
            <Pricing shouldRedirect={true} />
            <HomepageFooter />
        </>
    )
}