import { useEffect, useState } from "react";
import { PartialFormDataType } from "../types";

const culturalPreferencesConfing = [
    'Macedonian',
    'Balkan',
    'European',
    'Mediterranean',
    'Global',
];

export function CulturalPreferences({ image, username, updateFields, cultureInterests, isValidationFailed }: PartialFormDataType) {

    const initialCultureInterests = cultureInterests || []
    const [selectedCulturalPreferences, setSelectedCulturalPreferences] = useState<string[]>(initialCultureInterests)

    const handleCulturalPreferenceClick = (preference: string) => {
        setSelectedCulturalPreferences((prevPreferences) => {
            if (prevPreferences.includes(preference)) {
                return prevPreferences.filter((item) => item !== preference)
            } else {
                return [...prevPreferences, preference]
            }
        })
    }

    useEffect(() => {
        updateFields({ cultureInterests: selectedCulturalPreferences })
    }, [selectedCulturalPreferences])

    const isImageBase64 = image && image.length > 100

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select at least one cultural preference</p>
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
                >   </div>
                <span>{username}</span>
            </div>

            <h2 className="creacte-acc-title">Which cultures resonate with you?</h2>
            <h3 className="creacte-acc-subtitle">Your choices help us curate content just for you.</h3>
            <div className="cultural-preferences-wrap">
                {culturalPreferencesConfing.map((el, idx) =>
                    <button type="button"
                        className={`cultural-preferences-button ${selectedCulturalPreferences.includes(el) ? 'selected' : ''}`}
                        key={idx}
                        onClick={() => handleCulturalPreferenceClick(el)}
                    >
                        {el}
                    </button>
                )}
            </div>
        </>
    );
}
