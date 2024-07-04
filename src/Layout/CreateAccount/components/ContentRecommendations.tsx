import { useEffect, useState } from "react";
import { PartialFormDataType } from "../types";

const contentRecommendationsConfig = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Thriller",
    "Documentary",
];

export function ContentRecommendation({ updateFields, contentRecommendations, image, username, isValidationFailed }: PartialFormDataType) {

    const initialContentRecommendations = contentRecommendations || []
    const [selectedContentRecommendations, setSelectedContentRecommendations] = useState<string[]>(initialContentRecommendations);

    const handleContentRecommendationClick = (recommendation: string) => {
        setSelectedContentRecommendations((prevRecommendations) => {
            if (prevRecommendations.includes(recommendation)) {
                return prevRecommendations.filter((item) => item !== recommendation)
            } else {
                return [...prevRecommendations, recommendation]
            }
        })
    }

    useEffect(() => {
        updateFields({ contentRecommendations: selectedContentRecommendations })
    }, [selectedContentRecommendations])

    const isImageBase64 = image && image.length > 100

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select at least one content recommendation</p>
            </div>
            <div className="accout-setup-avatar-box">
                <div
                    className="account-setup-avatar-box__img-box"
                    style={{
                        backgroundImage: image
                            ? isImageBase64
                                ? `url(data:image/jpeg;base64,${image})`
                                : `url(${image})`
                            : 'url(/multiStepForm/profile-picture-1.png)'
                    }}
                ></div>
                <span>{username}</span>
            </div >
            <h2 className="creacte-acc-title">Content Recommendations</h2>
            <div className="content-recommendation-wrap">
                {contentRecommendationsConfig.map((el, idx) =>
                    <button
                        type="button"
                        className={`content-recommendation-button ${selectedContentRecommendations.includes(el) ? 'selected' : ''}`}
                        key={`${idx}-recommendation`}
                        onClick={() => handleContentRecommendationClick(el)}
                    >
                        {el}
                    </button>
                )}
            </div>
        </>
    );
}
