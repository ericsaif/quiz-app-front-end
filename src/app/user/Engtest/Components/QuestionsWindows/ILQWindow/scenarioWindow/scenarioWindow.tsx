import { Button } from "@headlessui/react"
import { SetStateAction } from "react"

import "./scenarioWindow.css"

const scenarioWindow = (props:{
    scenario: string
    setcontextWindow: React.Dispatch<SetStateAction<boolean>>
}) =>{
    const {scenario, setcontextWindow} = props
    return (
        <div>
            <h3 className="scenario-header">
                You will participate in a conversation about the scenario below
            </h3>
            <p className="scenario-paragraph">
                {scenario}
            </p>
            <Button className={`submit-btn`} type="button" onClick={()=>setcontextWindow(false)}>Start</Button>

        </div>
    )
}

export default scenarioWindow