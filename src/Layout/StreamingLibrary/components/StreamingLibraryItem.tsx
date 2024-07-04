import { Link } from "react-router-dom";
import { StreamingLibraryItemType } from "../types";
import { motion } from 'framer-motion'

export function StreamingLibraryItem({ streamingItemImage, streamingItemName, linkTo }: StreamingLibraryItemType) {
    return (
        <Link to={linkTo} className="streaming-library-item">
            <h2>{streamingItemName}</h2>
            <img src={streamingItemImage} alt="movie-room-img" />
        </Link>
    )
}