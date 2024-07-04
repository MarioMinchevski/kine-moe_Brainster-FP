import { AsideNavBar } from "../../Layout/AsideNavBar/AsideNavBar";
import { Header } from "../../Layout/Header/Header";

import { MediaSliderWrap } from "../../Layout/MediaSliderWrap/MediaSliderWrap";
import { PaginationButton } from "../../Layout/SharedComponents/PaginationButton/PaginationButton";
import { Footer } from "../../Layout/SharedComponents/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { MediaItemType } from "../../SharedTypes/SharedTypes";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";
import { useEffect, useState } from "react";
import { getRandomItems } from "../../utils/getRandomItems";

export function Movies() {
    const { data: allMediaItems, error: errorTwo, isLoading: isLoadingTwo } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies']
    })

    // this is temporary, to generate random items, until client defines based on what will these section will be rendered exactly

    const [randomMediaItems, setRandomMediaItems] = useState<MediaItemType[]>([])
    useEffect(() => {
        if (allMediaItems && allMediaItems.length > 0) {
            setRandomMediaItems(getRandomItems(allMediaItems, 9))
        }
    }, [allMediaItems])

    if (isLoadingTwo || errorTwo) {
        return <div>Loading...</div>
    }

    // filtered items by genre

    const actionMediaItems = allMediaItems?.filter(item => item.genres.includes('Action'))

    const comedyMediaItems = allMediaItems?.filter(item => item.genres.includes('Comedy',))

    const horrorMediaItems = allMediaItems?.filter(item => item.genres.includes('Horror'))

    const dramaMediaItems = allMediaItems?.filter(item => item.genres.includes('Drama'))

    const historyMediaItems = allMediaItems?.filter(item => item.genres.includes('History'))

    const mediaSliderWrapConfig = [
        { title: 'Популарно', content: randomMediaItems },
        { title: 'Акција', content: actionMediaItems },
        { title: 'Комедија', content: comedyMediaItems },
        { title: 'Хоррор', content: horrorMediaItems },
        { title: 'Драма', content: dramaMediaItems },
        { title: 'Историја', content: historyMediaItems }
    ]

    return (
        <div className="movies">
            <Header />
            <AsideNavBar />
            <main className="movies-main">
                {mediaSliderWrapConfig.map((slider, idx) => (
                    <MediaSliderWrap
                        title={slider.title}
                        content={slider.content as MediaItemType[]}
                        idx={idx} />
                ))}
                <PaginationButton />
            </main>
            <Footer />
        </div>
    )
}