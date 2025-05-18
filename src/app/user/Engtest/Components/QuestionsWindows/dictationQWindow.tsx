import { Button, Input } from "@headlessui/react"
import { DictationQ, MethodArgs } from "./commonImports"
import React, { useState } from "react"
import AudioPlayer from "../../../../../../Components/AudioPlayer/AudioPlayer"


const DictationQWindow = (props:{question: DictationQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const { question, submitAnswer } = props
    const [answer, setAnswer] = useState<string>("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        submitAnswer("SubmitDictationAsnwerAsync", {DictationA: answer, QId: question.id})
    }
    
    return(
        <React.Fragment key={`dictation-window-react-fragment`}>
                <form onSubmit={handleSubmit}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <AudioPlayer keyName={question.s3PathToAudio} maxListenTries={question.listenTries} />
                    </div>
                    <div className="vstack d-grid gap-2">
                        <Input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        <Button className={`submit-btn`} type="submit">Submit</Button>
                    </div>

                </form>
        </React.Fragment>
    )
}

export default DictationQWindow