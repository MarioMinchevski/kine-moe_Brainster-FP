import { useQuery } from "@tanstack/react-query";
import { MediaItemType, UserType } from "../../SharedTypes/SharedTypes";
import { MediaSliderWrap } from "../MediaSliderWrap/MediaSliderWrap";
import { motion } from "framer-motion";
import { fetchAllMediaItems } from "../../utils/fetchAllMediaItems";


export function UserWatchedMedia() {

    const { data: allMediaItems, error: errorTwo, isLoading: isLoadingTwo } = useQuery<MediaItemType[]>({
        queryFn: fetchAllMediaItems,
        queryKey: ['movies']
    })

    const userInfoString = localStorage.getItem("user");
    const userInfo: UserType = userInfoString ? JSON.parse(userInfoString) : null

    const { watchedMovies, username } = userInfo

    if (isLoadingTwo || errorTwo) {
        return <div>Loading...</div>
    }

    const watchedMedia = allMediaItems?.filter(media => watchedMovies.includes(Number(media.id)))


    console.log(watchedMovies)
    console.log(allMediaItems)

    return (
        <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0, transition: { duration: 0.85 } }}
            className="user-watched-media">
            <MediaSliderWrap
                title={`What ${username} watched:`}
                content={watchedMedia as MediaItemType[]}
                extraClass="user" />
        </motion.div>
    )
}