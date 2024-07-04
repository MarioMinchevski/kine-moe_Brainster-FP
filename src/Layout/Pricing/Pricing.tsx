import { useEffect, useRef, useState } from "react";
import { PricingItem } from "./PricingItem"
import { prcingItemsConfigType, PricingPropType } from "./types"
import { motion, useInView, useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";
import { slideInViewYaxisVarintsAlt } from '../Utils/animationVariants';

const prcingItemsConfig: prcingItemsConfigType = [
    {
        title: 'Watch with ads',
        price: 'Free',
        features: [
            'Access to a Vast Library',
            'Unlimited Streamin',
            'Multiple Devices',
            'No Subscription Fee'
        ]
    },
    {
        title: 'Pay to watch',
        price: '499den./month',
        features: [
            'Access to a Vast Library',
            'Unlimited Streaming',
            'Multiple Devices',
            'No Subscription Fee',
            'Watch without ads',
            'Offline Viewing'
        ],
        extraNote: true
    },
    {
        title: 'Engage and receive points',
        price: 'Watch with points',
        features: [
            'Earn points when you engage',
            'Claim rewards with earned points',
            'No Subscription Fee',
        ]
    }
]

export function Pricing({ extraClassName, updateFields, paymentType, shouldRedirect }: PricingPropType) {
    const [selectedPricing, setSelectedPricing] = useState<string | null>(null)

    const location = useLocation()
    const isHomepage = location.pathname === '/'

    const pricingRef = useRef<HTMLElement>(null)
    const isInView = useInView(pricingRef, { once: true })
    const mainControls = useAnimation()

    function handleRegisterClick(paymentType: string) {
        if (updateFields)
            updateFields({ paymentType })
        setSelectedPricing(paymentType)
    }

    useEffect(() => {
        if (paymentType) {
            setSelectedPricing(paymentType)
        }
    }, [paymentType])

    useEffect(() => {
        if (isHomepage && isInView) {
            mainControls.start("visible");
        }
    }, [isHomepage, isInView, mainControls])

    return (
        <motion.section
            ref={pricingRef}
            variants={isHomepage ? slideInViewYaxisVarintsAlt : {}}
            initial="hidden"
            animate={mainControls}
            className="pricing">
            <div className={`pricing-items-container ${extraClassName}`}>
                {prcingItemsConfig.map((el, idx) =>
                    <PricingItem
                        {...el}
                        key={`${el.title}-${idx}`}
                        isSelected={el.title === selectedPricing}
                        onRegisterClick={() => handleRegisterClick(el.title)}
                        shouldRedirect={shouldRedirect}
                    />
                )}
            </div>
        </motion.section>
    )
}