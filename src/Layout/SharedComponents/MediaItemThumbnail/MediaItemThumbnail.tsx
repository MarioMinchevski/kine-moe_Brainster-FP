import { useState } from "react"
import { useNavigate } from "react-router-dom"


export type MediaItemThumbnailType = {
    thumbnailImage: string,
    id: string,
    extraClass?: string
}

export function MediaItemThumbnail({ id, thumbnailImage, extraClass }: MediaItemThumbnailType) {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const navigate = useNavigate()

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartX(e.clientX)
        setIsDragging(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (Math.abs(e.clientX - startX) > 10) {
            setIsDragging(true)
        }
    }

    const handleMouseUp = () => {
        if (!isDragging) {
            navigate(`/movie-overview/${id}`)
        }
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    return (
        <div className={`media-item-thumbnail ${extraClass || ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleClick}>
            <img src={thumbnailImage} alt={thumbnailImage} />
        </div>
    )
}