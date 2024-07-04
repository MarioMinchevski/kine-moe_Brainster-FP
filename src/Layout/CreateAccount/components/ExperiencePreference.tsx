import { useEffect, useState } from "react";
import { PartialFormDataType } from "../types";

export function ExperiencePreference({ experiencePreferenceTutorial, updateFields, isValidationFailed }: PartialFormDataType) {
    const [selectedOption, setSelectedOption] = useState<string>('')

    const handleOptionChange = (e: any) => {
        const selectedTutorialOption = e.target.value
        setSelectedOption(selectedTutorialOption)

        if (selectedTutorialOption === 'show-around') {
            updateFields({
                experiencePreferenceTutorial: 'show-around'
            })
        } else if (selectedTutorialOption === 'dive-in') {
            updateFields({
                experiencePreferenceTutorial: 'dive-in'
            })
        }
    }

    useEffect(() => {
        if (experiencePreferenceTutorial !== null) {
            if (experiencePreferenceTutorial === 'show-around') {
                setSelectedOption('show-around')
            } else if (experiencePreferenceTutorial === 'dive-in') {
                setSelectedOption('dive-in')
            }
        }

    }, [experiencePreferenceTutorial])

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select your engagement preference with Kinemoe</p>
            </div>
            <h2 className="creacte-acc-title-small">How do you wish to engage with Kinemoe?</h2>
            <div className="experience-buttons-wrap">
                <label className={`experience-button ${selectedOption === 'show-around' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="experience"
                        value="show-around"
                        checked={selectedOption === 'show-around'}
                        onChange={handleOptionChange}
                        className="hidden-radio"
                    />
                    <img src="/multiStepForm/eye-icon.png" alt="eye-icon" />
                    <span>Show me around</span>
                </label>
                <label className={`experience-button ${selectedOption === 'dive-in' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="experience"
                        value="dive-in"
                        checked={selectedOption === 'dive-in'}
                        onChange={handleOptionChange}
                        className="hidden-radio"
                    />
                    <img src="/multiStepForm/crowd-icon.png" alt="crowd-icon" />
                    <span>Dive right in and explore</span>
                </label>
            </div>
        </>
    );
}
