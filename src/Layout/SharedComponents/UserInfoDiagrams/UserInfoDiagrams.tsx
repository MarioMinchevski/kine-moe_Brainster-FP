import { CircularProgressbar } from "react-circular-progressbar"
import { UserInfoDiagramsProvider } from "./UserInfoDiagramsProvider";

export function UserInfoDiagrams(props: any) {
    const { score } = props

    return (
        <UserInfoDiagramsProvider valueStart={0} valueEnd={score}>
            {(value: number) => (
                <CircularProgressbar
                    value={value}
                    text={`${value}`}
                    circleRatio={1}
                    styles={{
                        root: {
                            willChange: "transform",
                        }
                        ,
                        trail: {
                            strokeLinecap: 'butt',
                            transform: 'rotate(90deg)',
                            transformOrigin: 'center center',
                            stroke: '#0B151B',
                            transition: 'stroke 0.5s ease'
                        },
                        path: {
                            strokeLinecap: 'butt',
                            transform: 'rotate(90deg)',
                            transformOrigin: 'center center',
                            stroke: "#529C3D",
                            transition: "stroke-dashoffset 1s ease",
                        },
                        text: {
                            fill: '#FFFFFF',
                            dominantBaseline: 'central',
                            textAnchor: 'middle',
                            fontSize: '15px',
                            fontWeight: 'bold'
                        },
                    }}
                    strokeWidth={22}
                />
            )}
        </UserInfoDiagramsProvider >
    );
}