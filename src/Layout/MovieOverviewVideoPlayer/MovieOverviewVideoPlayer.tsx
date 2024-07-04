import React from "react";

export const MovieOverviewVideoPlayer = React.forwardRef<HTMLVideoElement>((props, ref) => {
    return (
        <video className="movie-trailer" width={1920} autoPlay muted ref={ref} loop >
            <source src="/exampleVid/videoplayback.mp4" />
        </video>
    );
})
