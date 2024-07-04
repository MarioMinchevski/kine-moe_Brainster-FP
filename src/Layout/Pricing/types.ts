import { UpdateFieldsFunction } from "../CreateAccount/types"

export type prcingItemsConfigType = prcingItemsConfigItemType[]

export type prcingItemsConfigItemType = {
    title: string
    price: string
    features: string[]
    extraNote?: boolean
    shouldRedirect?: boolean
}

export type PricingPropType = {
    extraClassName?: string
    paymentType?: string
    updateFields?: UpdateFieldsFunction
    shouldRedirect?: boolean
}

