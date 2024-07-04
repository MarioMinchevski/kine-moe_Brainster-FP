import { Pricing } from "../../Pricing/Pricing";
import { PartialFormDataType } from "../types";

export function SubscriptionOptions({ updateFields, paymentType, isValidationFailed }: PartialFormDataType) {
    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select your subscription method</p>
            </div>
            <h2 className="creacte-acc-title-small">How do you wish to engage with kinemoe?</h2>
            <Pricing extraClassName={'smaller'} updateFields={updateFields} paymentType={paymentType} />
        </>
    )
}