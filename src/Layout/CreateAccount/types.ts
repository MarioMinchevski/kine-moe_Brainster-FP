import { ReactNode } from "react"

export type FormWrapperType = {
    title: string,
    children: ReactNode
}

export type FormDataType = {
    id: string
    userType: string;
    interests: string[];
    experiencePreferenceTutorial: string;
    paymentType: string;
    username: string;
    password: string;
    confirmPassword: string;
    description: string;
    image: string;
    cultureInterests: string[];
    contentRecommendations: string[];
    emailNotification: boolean;
    pushNotification: boolean;
    noNotification: boolean;
    privacySettings: string;
    watchedMovies: number[];
    likedMovies: number[];
    userComments: string[];
    userPosts: string[];
    email: string
}

export type UpdateFieldsFunction = (fields: Partial<FormDataType>) => void

export type PartialFormDataType = Partial<FormDataType> & {
    updateFields: UpdateFieldsFunction
    isValidationFailed?: boolean

}