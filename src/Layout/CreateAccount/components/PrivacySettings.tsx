import { useEffect, useState } from "react";
import { PartialFormDataType } from "../types";

const privacySettingsConfig = [
    "My friends",
    "Public",
    "Only me"
];

export function PrivacySettings({ username, image, privacySettings, updateFields, isValidationFailed }: PartialFormDataType) {

    const [selectedPrivacySetting, setSelectedPrivacySetting] = useState<string>(privacySettings || "")

    const handlePrivacySettingClick = (setting: string) => {
        setSelectedPrivacySetting(setting)
    };

    useEffect(() => {
        updateFields({ privacySettings: selectedPrivacySetting })
    }, [selectedPrivacySetting])

    const isImageBase64 = image && image.length > 100

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select a privacy setting</p>
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
            </div>
            <h2 className="creacte-acc-title">Select your privacy settings</h2>
            <h3 className="creacte-acc-subtitle">Choose who sees your profile:</h3>
            <div className="privacy-settings-wrap">
                {privacySettingsConfig.map((el, idx) => (
                    <button
                        type="button"
                        key={`${idx}-privacy`}
                        className={`privacy-settings-button ${selectedPrivacySetting === el ? 'selected' : ''}`}
                        onClick={() => handlePrivacySettingClick(el)}
                    >
                        {el}
                    </button>
                ))}
            </div>
        </>
    );
}
