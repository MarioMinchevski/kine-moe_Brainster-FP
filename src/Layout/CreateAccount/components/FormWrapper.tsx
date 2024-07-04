import { FormWrapperType } from "../types";

export function FormWrapper({ title, children }: FormWrapperType) {
    return (
        <div>{children}</div>
    )
}