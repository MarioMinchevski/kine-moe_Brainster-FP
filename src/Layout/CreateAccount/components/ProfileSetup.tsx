import React, { useEffect, useRef, useState } from "react";
import { PartialFormDataType } from "../types";

export function ProfileSetup({ image, password, username, updateFields, description, isValidationFailed, }: PartialFormDataType) {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreviewImage(imageUrl)


            const reader = new FileReader()
            reader.onloadend = () => {

                const base64String = (reader.result as string)?.replace("data:", "").replace(/^.+,/, "")
                updateFields({ image: base64String })
            }
            reader.readAsDataURL(file)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        updateFields({ [name]: value })
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        updateFields({ password: value })
        updateFields({ confirmPassword: value })
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target
        updateFields({ description: value })
    }

    const triggerFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    };

    useEffect(() => {
        if (image && image.length > 100) {
            setPreviewImage(`data:image/jpeg;base64,${image}`);
        }
    }, [image])

    const isImageBase64 = image && image.length > 100
    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please fill in a valid username and password</p>
            </div>
            <h2 className="creacte-acc-title">Setup Profile</h2>
            <div className="profile-setup-wrap">
                <div
                    className="profile-setup-img-box"
                    style={{
                        backgroundImage: previewImage
                            ? `url(${previewImage})`
                            : isImageBase64
                                ? `url(data:image/jpeg;base64,${image})`
                                : `url(${image})`
                    }}
                >
                    <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden-file-input" />
                    <div className="upload-photo-text" onClick={triggerFileInputClick}>
                        <span>Upload photo</span>
                        <img src="/multiStepForm/camera-icon.png" alt="camera-icon" />
                    </div>
                </div>
                <div className="profile-setup-inputs-box">
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="input-control"
                            placeholder="Username"
                            value={username}
                            onChange={handleInputChange}
                        />
                        <div className="message"></div>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="input-control"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="message"></div>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="input-control"
                            placeholder="Confirm Password"
                            onChange={handleInputChange}
                        />
                        <div className="message"></div>
                    </div>
                    <div className="input-group">
                        <textarea
                            name="description"
                            id="description"
                            className="input-control"
                            placeholder="Tell us about yourself..."
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    );
}
