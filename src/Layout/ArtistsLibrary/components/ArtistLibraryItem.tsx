import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArtistItemType } from '../../../SharedTypes/SharedTypes';



export function ArtistLibraryItem({ image, imageMain }: ArtistItemType) {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

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
            navigate("/sign-in")
        }
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    const imageToShow = location.pathname === '/' ? imageMain : image

    return (
        <div className="artist-library-item"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleClick}>
            <img src={imageToShow} alt="artist-image" />
        </div>
    )
}
