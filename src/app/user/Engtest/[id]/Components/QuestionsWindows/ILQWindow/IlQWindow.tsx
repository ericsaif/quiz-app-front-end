import React, { SyntheticEvent, useEffect, useState, useRef } from "react"
import { ILQ, MethodArgs } from "../commonImports"
import { Button } from "@headlessui/react"
import Options from "./GivenDOptions/Options"


const IlQWindow = (props:{question: ILQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const [currentILQ, setCurrentILQ] = useState<number>(0)
    const [AId, setAId] = useState<number[]>([])
    const [summary, setsummary] = useState<string>("")
    const [dialog, setDialog] = useState<React.ReactNode[]>()
    const [CurrentOptions, setCurrentOptions] = useState<React.ReactNode>()
    const [CurrentAudio, setCurrentAudio] = useState<React.ReactNode>()
    
    const S3Paths = props.question.s3pathsToAudioAnswers
    const GivenDOptions = props.question.givenDialogoptions
    const correctDOptions = props.question.correctDialogOptions.correctOptionsDialogOptions

    useEffect(()=>{
        const NextDialog = (
            <div></div>

        )
        const AudioButton = (
            <div></div>
        )
        setDialog((prevDialog) =>({
            ...(prevDialog || []),
                AudioButton,
                NextDialog
        }))
    }, [currentILQ, dialog, S3Paths])

    const PlayAudio = (audiolink: string) =>{
        const audioRef = useRef<HTMLAudioElement>(null)
        if(audioRef.current){
            audioRef.current.src = audiolink
            audioRef.current.play()
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const newM: MethodArgs = {
            "AId": AId,
            "summary": summary,
            "answer": props.question.correctDialogOptions,
            "QPOId": props.question.qPOId,
        }
        props.submitAnswer("SubmitILQAAsync", newM)
    }

    const HandleOptionsSelect = (event: SyntheticEvent<HTMLSelectElement, Event>) => {
        const value = (event.target as HTMLSelectElement).value

        // check answer
        // later change the audio and the user_options

        setCurrentAudio(
            <Button className="Audio_Dialog_Answer" onClick={()=>{PlayAudio(S3Paths[currentILQ])}}></Button>
        )

        setCurrentOptions(
            <select className="ILQ_USER_OPTIONS" name={currentILQ.toString()} id={currentILQ.toString()} key={currentILQ} onSelect={HandleOptionsSelect}>
                <Options options={GivenDOptions} CurrentILQ={currentILQ}/>
            </select>
        )
        setAId((prevAIds)=>({
            ...(prevAIds || []),
            value
        }))
    }

    return(

        <form onSubmit={handleSubmit}>
            <div>
                    {dialog}
                    {CurrentAudio}
                    {CurrentOptions}
            </div>
            <Button></Button>
        </form>
        
    )
}

export default IlQWindow