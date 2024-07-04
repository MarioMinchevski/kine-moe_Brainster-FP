export const slideInViewYaxisVarints = {
    hidden: { opacity: 0, y: 275 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2
        }
    },
}

export const slideInViewYaxisVarintsAlt = {
    hidden: { opacity: 0, y: 175 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.5
        }
    },
}

export const asideVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 100 } },
}

export const asideVariantsAlt = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, duration: 3 } },
}

export const asideVariantsWelcomeMessage = {
    hidden: { x: "-150%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, duration: 3 } },
    exit: { x: "-150%", opacity: 0, transition: { duration: 0.2 } }
}
export const asideVariantsAltTwo = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, duration: 3 } },
}

export const asideVariantsAltThree = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            delay: 0.2
        }
    },
}

export const asideVariantsAltFour = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            delay: 0.2
        }
    },
}

export const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.35 }
}