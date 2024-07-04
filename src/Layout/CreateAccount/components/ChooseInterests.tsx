import { useEffect, useState } from "react";
import { PartialFormDataType } from "../types"; // Ensure this import matches your project structure

const interestsConfig = [
    "Cinema",
    "Visual Arts",
    "Dance",
    "Teatre",
    "Music",
    "Literature",
    "More Options"
];

export function ChooseInterests({ image, username, interests, updateFields, isValidationFailed }: PartialFormDataType) {

    const initialSelectedInterests = interests || []
    const [selectedInterests, setSelectedInterests] = useState<string[]>(initialSelectedInterests)

    const handleInterestClick = (interest: string) => {
        setSelectedInterests((prevInterests) => {
            if (prevInterests.includes(interest)) {
                return prevInterests.filter((item) => item !== interest)
            } else {
                return [...prevInterests, interest]
            }
        });
    }

    useEffect(() => {
        updateFields({ interests: selectedInterests })
    }, [selectedInterests])

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select at least one interest</p>
            </div>
            <div className="accout-setup-avatar-box">
                <div className="account-setup-avatar-box__img-box" style={{ backgroundImage: `url(${image ? `data:image/jpeg;base64,${image}` : '/multiStepForm/profile-picture-1.png'})` }}></div>
                <span>{username}</span>
            </div>
            <h2 className="creacte-acc-title-small">
                Tell us what moves you. Select your interests to tailor your Kinemoe universe.
            </h2>
            <div className="interests-buttons-wrap">
                {interestsConfig.map((interest, idx) => (
                    <button
                        type="button"
                        key={`${idx}-interest`}
                        className={`interest-button ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                        onClick={() => handleInterestClick(interest)}
                    >
                        {interest}
                    </button>
                ))}
            </div>
        </>
    );
}
