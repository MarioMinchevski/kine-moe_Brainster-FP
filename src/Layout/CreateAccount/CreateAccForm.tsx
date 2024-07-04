import { FormEvent, useState } from "react"
import { useMultistepForm } from "../../Hooks/useMultistepForm"
import { ChooseInterests } from "./components/ChooseInterests"
import { ContentRecommendation } from "./components/ContentRecommendations"
import { CulturalPreferences } from "./components/CulturalPreferences"
import { ExperiencePreference } from "./components/ExperiencePreference"
import { NotificationPreferences } from "./components/NotificationPreferences"
import { PrivacySettings } from "./components/PrivacySettings"
import { ProfileSetup } from "./components/ProfileSetup"
import { SubscriptionOptions } from "./components/SubscriptionOptions"
import { UserOrArtist } from "./components/UserOrArtist"
import { FormDataType } from "./types"
import { motion, AnimatePresence } from 'framer-motion';
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom"
import { useUserLoggedInContext } from "../../Context/UserLoggedInContext"
import { addUser } from "../../utils/addUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"

let userId = Math.random().toString().slice(2)

const INITIAL_DATA: FormDataType = {
    id: userId,
    userType: "",
    interests: [],
    experiencePreferenceTutorial: '',
    paymentType: "",
    username: "",
    password: "",
    confirmPassword: "",
    description: "",
    image: "/userProfile/profile-picure.png",
    cultureInterests: [],
    contentRecommendations: [],
    emailNotification: false,
    pushNotification: false,
    noNotification: false,
    privacySettings: "",
    watchedMovies: [
        1,
        3,
        14,
        4,
        5,
        7,
        8,
        9,
        12
    ],
    likedMovies: [
        1,
        3,
        14,
        4,
        5,
        7,
        8,
        9,
        12
    ],
    userComments: [],
    userPosts: [],
    email: ''
}

const stepSchemas = [
    yup.object().shape({
        userType: yup.string().required()
    }),
    yup.object().shape({
        interests: yup.array().of(yup.string()).min(1).required()
    }),
    yup.object().shape({
        experiencePreferenceTutorial: yup.string().required()
    }),
    yup.object().shape({
        paymentType: yup.string().required()
    }),
    yup.object().shape({
        username: yup.string().trim().required(),
        password: yup.string().required().min(6),
        confirmPassword: yup.string().required().oneOf([yup.ref('password'),], 'Passwords must match'),
    }),
    yup.object().shape({
        cultureInterests: yup.array().of(yup.string()).min(1).required()
    }),
    yup.object().shape({
        contentRecommendations: yup.array().of(yup.string()).min(1).required()
    }),
    yup.object().shape({
        emailNotification: yup.boolean(),
        pushNotification: yup.boolean(),
        noNotification: yup.boolean(),
    }).test((data) => {
        return data.emailNotification || data.pushNotification || data.noNotification;
    }),
    yup.object().shape({
        privacySettings: yup.string().required()
    })
]

const textSlideVariants = {
    enter: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }

}

export function CreateAccForm() {
    const queryClient = useQueryClient()

    const location = useLocation()
    const { email, password } = location.state || { email: '', password: '' }

    const INITIAL_DATA_WITH_EMAIL: FormDataType = {
        ...INITIAL_DATA,
        email,
        password
    }

    const [data, setData] = useState(INITIAL_DATA_WITH_EMAIL)
    const [isValidationFailed, setIsValidationFailed] = useState(false)

    const navigate = useNavigate()
    const { logUserIn, isUserLoggedIn } = useUserLoggedInContext()

    const handleLogIn = () => {
        logUserIn()
    }

    function updateFields(fields: Partial<FormDataType>) {
        setData((prevData) => {
            return {
                ...prevData, ...fields
            }
        })
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, prevStep, nextStep } = useMultistepForm([
        <UserOrArtist {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <ChooseInterests {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <ExperiencePreference {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <SubscriptionOptions {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <ProfileSetup {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <CulturalPreferences {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <ContentRecommendation {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <NotificationPreferences {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />,
        <PrivacySettings {...data}
            updateFields={updateFields}
            isValidationFailed={isValidationFailed}
        />

    ])

    function getCurrentStepData() {
        const currentStepData: any = {}
        const currentStepFields = Object.keys(stepSchemas[currentStepIndex].fields) as Array<keyof FormDataType>

        currentStepFields.forEach((field: keyof FormDataType) => {
            currentStepData[field] = data[field]
        })

        return currentStepData
    }

    const addUserMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    async function onSubmit(e: FormEvent) {
        e.preventDefault()

        const currentStepData = getCurrentStepData()
        const isValid = await stepSchemas[currentStepIndex].isValid(currentStepData)

        if (isValid) {
            if (!isLastStep) {
                nextStep()

                setIsValidationFailed(false)
            } else {
                setIsValidationFailed(false)
                await addUserMutation.mutateAsync(data)

                localStorage.setItem('user', JSON.stringify(data))


                handleLogIn()
                navigate('/home')
                console.log(isUserLoggedIn)
            }
        } else {
            setIsValidationFailed(true)
        }

    }
    const progressWidth = `${(100 / steps.length) * (currentStepIndex + 1)}%`

    return (
        <form action="" className="create-acc-form" onSubmit={onSubmit}>
            <AnimatePresence >
                <motion.div
                    key={currentStepIndex}
                    variants={textSlideVariants}
                    initial="enter"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="step-wrap"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} >
                    {step}
                    <div className="next-prev-buttons-wrap">
                        {!isFirstStep && < button className="create-acc-btn "
                            type='button'
                            onClick={prevStep}>
                            <img src="/multiStepForm/arrow-back.png" alt="arrow-back" />
                            Back
                        </button>}
                        <button className="create-acc-btn "
                            type='submit'
                        >
                            <img src="/multiStepForm/arrow-next.png" alt="arrow-next" />
                            {isLastStep ? "Set my profile" : "Next"}
                        </button>
                        <div className="progress-bar">
                            <div className="progress-bar__inner" style={{ width: progressWidth }}>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </form >
    )
}