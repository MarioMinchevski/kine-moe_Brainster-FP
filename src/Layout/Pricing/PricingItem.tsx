import { useNavigate } from "react-router-dom";
import { prcingItemsConfigItemType } from "./types";

export function PricingItem({ title, features, price, extraNote, isSelected, onRegisterClick, shouldRedirect = false }: prcingItemsConfigItemType & { isSelected: boolean, onRegisterClick: () => void }) {

    const navigate = useNavigate()

    const handleClick = () => {
        if (shouldRedirect) {
            navigate('/sign-in')
        } else {
            onRegisterClick()
        }
    }

    return (
        <div className={`pricing-item ${isSelected ? 'selected' : ''}`}>
            {extraNote && (
                <div className="optimal-choice">
                    <h3>Optimal choice</h3>
                </div>
            )}
            <div className="pricing-item__title">
                <h3>{title}</h3>
            </div>
            <div className="pricint-item__content">
                <span className="pricing-item__price">{price}</span>
                <ul className="pricing-item__feauteres">
                    {features.map((feature, idx) =>
                        <li key={`${feature}-${idx}`}>{feature}</li>
                    )}
                </ul>
                <button type="button" className="pricing-register-btn" onClick={handleClick}>
                    Register
                </button>
            </div>
        </div>
    )
}
