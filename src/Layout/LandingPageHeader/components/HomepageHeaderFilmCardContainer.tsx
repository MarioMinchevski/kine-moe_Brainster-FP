import { useQuery } from "@tanstack/react-query";
import { HomepageHeaderFilmCardItem } from "./HomepageHeaderFilmCardItem";
import { MediaItemType } from "../../../SharedTypes/SharedTypes";
import { fetchRandomMediaItems } from "../../../utils/fetchRandomMediaItems";
import { useEffect, useState } from "react";
import { fetchAllMediaItems } from "../../../utils/fetchAllMediaItems";
import { getRandomItems } from "../../../utils/getRandomItems";

export function HomepageHeaderFilmCardContainer() {
    const { data: allMediaItems, isLoading, isSuccess, error } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies']
    })

    const [randomMediaItems, setRandomMediaItems] = useState<MediaItemType[]>([])

    useEffect(() => {
        if (isSuccess && allMediaItems) {
            setRandomMediaItems(getRandomItems(allMediaItems, 7))
        }
    }, [allMediaItems, isSuccess])

    if (isLoading || error) {
        return <div>Loading...</div>
    }

    return (
        <div className="homepage-film-card-container">
            {randomMediaItems.map((el, idx) => (
                <HomepageHeaderFilmCardItem key={`homepageHeaderFilmCardItem-${idx + 1}`} index={idx} {...el} />
            ))}
        </div>
    );
}
