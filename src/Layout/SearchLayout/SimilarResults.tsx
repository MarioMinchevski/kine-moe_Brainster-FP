import { useEffect, useState } from "react";
import { MediaItemThumbnail, MediaItemThumbnailType } from "../SharedComponents/MediaItemThumbnail/MediaItemThumbnail";
import { SimilarResultsType } from "./types";
import { motion } from "framer-motion";
import { MediaItemType } from "../../SharedTypes/SharedTypes";
import { getRandomItems } from "../../utils/getRandomItems";

// random item generator util

export function SimilarResults({ similarResults, allMediaItems }: SimilarResultsType) {

    // this part is to generate random "recommendations picks" if similar results is empty or in other words if the user has not searched for anything or if the user got nothing in his search

    const [randomMediaItems, setRandomMediaItems] = useState<MediaItemType[]>([])
    useEffect(() => {
        if (allMediaItems && allMediaItems.length > 0) {
            setRandomMediaItems(getRandomItems(allMediaItems, 15))
        }
    }, [allMediaItems])


    return (
        <motion.div className="similar-results"
            initial={{ x: +200 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="similar-results__title">
                {similarResults.length !== 0 ?
                    'Similar results' :
                    'Discover temporary picks before diving into your search.'}
            </h2>
            <div className="similar-results__items-wrap">
                {similarResults.length === 0 ? (
                    randomMediaItems.map((el, idx) => (
                        <MediaItemThumbnail {...el} key={`${idx}`} extraClass="similar-results-item" />
                    ))
                ) : (
                    similarResults.map((el, idx) => (
                        <MediaItemThumbnail {...el} key={`${idx}`} extraClass="similar-results-item" />
                    ))
                )}
            </div>
        </motion.div>
    );
}