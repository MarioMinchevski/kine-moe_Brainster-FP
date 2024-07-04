import { HeaderBannerMenuItemType } from "../types";


export function PopularMoviesBanner({ img }: HeaderBannerMenuItemType) {
    return (
        <div className="popular-movies-banner"
            style={{ backgroundImage: `url(${img}` }}>
        </div>
    )
}