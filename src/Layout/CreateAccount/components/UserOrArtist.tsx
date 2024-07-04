import { useEffect, useState } from "react";
import { PartialFormDataType } from "../types";

export function UserOrArtist({ userType, updateFields, isValidationFailed }: PartialFormDataType) {

    const [isArtistChecked, setIsArtistChecked] = useState(userType === 'artist')
    const [isViewerChecked, setIsViewerChecked] = useState(userType === 'viewer')


    const handleArtistChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = ev.target.checked
        setIsArtistChecked(isChecked)
        setIsViewerChecked(!isChecked)

        if (isChecked) {
            updateFields({ userType: 'artist' })
        }
    }

    const handleViewerChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = ev.target.checked
        setIsViewerChecked(isChecked)
        setIsArtistChecked(!isChecked)

        if (isChecked) {
            updateFields({ userType: 'viewer' })
        }
    }

    useEffect(() => {
        setIsArtistChecked(userType === 'artist')
        setIsViewerChecked(userType === 'viewer')
    }, [userType])

    const artistClassName = `radio-btn ${isArtistChecked ? 'checked' : ''}`
    const viewerClassName = `radio-btn ${isViewerChecked ? 'checked' : ''}`

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select at least one interest</p>
            </div>
            <h1 className="create-acc-main-title">Join as a viewer or artist:</h1>
            <div className="radio-button-wrap">
                <label htmlFor="artist" className={artistClassName}>
                    <div className="radio-btn__inner-wrap">
                        <img src="/multiStepForm/artist-icon.png" alt="artist-icon" />
                        <input
                            type="radio"
                            name="userType"
                            id="artist"
                            value="artist"
                            checked={isArtistChecked}
                            onChange={handleArtistChange}
                        />
                        <div className="custom-radiot-btn"></div>
                    </div>
                    <span>Sign up as Artist</span>
                </label>
                <label htmlFor="viewer" className={viewerClassName}>
                    <div className="radio-btn__inner-wrap">
                        <img src="/multiStepForm/user-icon.png" alt="user-icon" />
                        <input
                            type="radio"
                            name="userType"
                            id="viewer"
                            value="viewer"
                            checked={isViewerChecked}
                            onChange={handleViewerChange}
                        />
                        <div className="custom-radiot-btn"></div>
                    </div>
                    <span>Sign up as Viewer</span>
                </label>
            </div>
        </>
    );
}
