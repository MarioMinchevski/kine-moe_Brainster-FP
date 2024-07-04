import { useEffect, useState } from "react"

export function UserInfoDiagramsProvider(props: { valueStart: number, valueEnd: number, children: (value: number) => JSX.Element }) {
    const { valueStart, valueEnd, children } = props
    const [value, setValue] = useState(valueStart)

    useEffect(() => {
        setValue(valueEnd)
    }, [valueEnd])

    return children(value)
}