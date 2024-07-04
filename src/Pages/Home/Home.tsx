import { useQuery } from "@tanstack/react-query";
import { AsideNavBar } from "../../Layout/AsideNavBar/AsideNavBar";
import { Header } from "../../Layout/Header/Header";
import { HomeMovieBanner } from "../../Layout/HomeMovieBanner/HomeMovieBanner";
import { MediaSliderWrap } from "../../Layout/MediaSliderWrap/MediaSliderWrap";
import { Footer } from "../../Layout/SharedComponents/Footer/Footer";
import { MediaItemType } from "../../SharedTypes/SharedTypes";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";
import { useEffect, useState } from "react";
import React from "react";
import { getRandomItems } from "../../utils/getRandomItems";


const firstBannerConfig = {
    title: 'Coming soon',
    img: '/banners/peaky-blinders-banner.png'
}

const secondBannerConfig = {
    img: '/banners/juzni-vetar-banner.png'
}

export function Home() {
    const { data: allMediaItems,
        error: errorTwo,
        isLoading: isLoadingTwo } = useQuery<MediaItemType[]>({
            queryFn: fetchAllMediaItems,
            queryKey: ['movies']
        })

    // this is temporary, to generate random items, until client defines based on what will these section will be rendered exactly

    const [randomMediaItems, setRandomMediaItems] = useState<MediaItemType[]>([])
    const [randomMediaItemsTwo, setRandomMediaItemsTwo] = useState<MediaItemType[]>([])
    const [randomMediaItemsThree, setRandomMediaItemsThree] = useState<MediaItemType[]>([])

    useEffect(() => {
        if (allMediaItems && allMediaItems.length > 0) {
            setRandomMediaItems(getRandomItems(allMediaItems, 9))
            setRandomMediaItemsTwo(getRandomItems(allMediaItems, 7))
            setRandomMediaItemsThree(getRandomItems(allMediaItems, 11))
        }
    }, [allMediaItems])

    if (isLoadingTwo || errorTwo) {
        return <div>Loading...</div>
    }

    // for these sections its self explanatory what kind of items should be rendered

    const podcastsMediaItems = allMediaItems?.filter(item => item.genres.includes('Podcast'))
    const kidsMediaItems = allMediaItems?.filter(item => item.genres.includes('Kids'))


    const mediaSliderWrapConfig = [
        { title: 'Popular', content: randomMediaItems },
        { title: 'New Release', content: randomMediaItemsTwo },
        { title: 'Our recommendation', content: randomMediaItemsThree },
        { title: 'Podcasts', content: podcastsMediaItems },
        { title: 'Kids', content: kidsMediaItems }
    ]

    return (
        <div className="homepage">
            <Header />
            <AsideNavBar />
            <main className="homepage-main">
                {mediaSliderWrapConfig.map((slider, idx) => (
                    <React.Fragment key={`slider-banner-${idx}`}>
                        {/* this had to have a key, hence react fragment  */}
                        <MediaSliderWrap
                            title={slider.title}
                            content={slider.content as MediaItemType[]} idx={idx} />
                        {(idx + 1) % 2 === 0 && idx !== mediaSliderWrapConfig.length - 1 &&
                            <HomeMovieBanner {...firstBannerConfig} />
                        }
                    </React.Fragment>
                ))}

                <HomeMovieBanner {...secondBannerConfig} />
            </main>
            <Footer />
        </div>
    );
}