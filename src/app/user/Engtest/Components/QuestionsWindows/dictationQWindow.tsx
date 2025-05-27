import { Button, Input } from "@headlessui/react"
import { DictationQ, MethodArgs } from "./commonImports"
import React, { useEffect, useState } from "react"
import AudioPlayer from "../../../../../../Components/AudioPlayer/AudioPlayer"


const  DictationQWindow = (props:{question: DictationQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const [answer, setAnswer] = useState<string>("")

    const [form, setform] = useState<React.ReactNode>()

    useEffect(()=>{
        const { question, submitAnswer, TimeOut } = props

        const handleSubmit = () =>{
            submitAnswer("SubmitDictationAsnwerAsync", {DictationA: answer, QId: question.id})
            setAnswer("")
        }

        if(TimeOut){
            handleSubmit()
            console.log("handling Time out = true ")
        }

        const form = (
            <React.Fragment key={`dictation-window-react-fragment`}>
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <AudioPlayer keyName={question.s3PathToAudio} maxListenTries={question.listenTries} />
                    </div>
                    <div className="vstack d-grid gap-2">
                        <Input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        <Button className={`submit-btn`} type="submit" onClick={handleSubmit}>Submit</Button>
                    </div>

                </div>
        </React.Fragment>
        )

        setform(form)
    }, [answer, props])
    
    return form
}

export default DictationQWindow