import React, { useEffect, useState, useRef } from "react"
import { ILQ, MethodArgs } from "../commonImports"
import { Button } from "@headlessui/react"
import Options from "./GivenDOptions/Options"

import { CiPlay1 } from "react-icons/ci";
import { BACKEND_BASE_URL } from "../../../../../../../constants/api";

const IlQWindow = (props:{question: ILQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{

    const { question, submitAnswer } = props
    const [currentILQ, setCurrentILQ] = useState<number>(0)
    const [AId, setAId] = useState<number[]>([])
    const [summary, setsummary] = useState<string>("")
    const [dialog, setDialog] = useState<React.ReactNode[]>([])
    const [CurrentOptions, setCurrentOptions] = useState<React.ReactNode>()
    const [CurrentAudio, setCurrentAudio] = useState<React.ReactNode>()
    
    const {s3pathsToAudioAnswers, givenDialogoptions, correctDialogOptions} = question

    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(()=>{
        
        const HandleOptionsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value

            // check answer
            // later change the audio and the user_options
            setAId((prevAIds)=>({
                ...(prevAIds || []),
                value
            }))

            
            const CurrentDialog = (
                <>
                    <div>
                        <p>Representation of audio player</p>
                    </div>
                    <div>
                        CurrentOptions - chosen option with formatting
                    </div>
                </>
            )
            setDialog((prevDialog) =>({
                ...(prevDialog || []),
                    CurrentDialog
            }))
            if(currentILQ < 5)
                setCurrentILQ(currentILQ+1)
            
        }

        
        const PlayAudio = async (audiolink: string) =>{
            if(audioRef.current){
                const response = await fetch(`${BACKEND_BASE_URL}/api/user/engtest/file?keyName=${audiolink}`,{
                    method: "GET",
                    credentials: 'include'
                })
                if (response.ok){
                    const responseData: string = await response.text()
                    console.log(responseData)
                    audioRef.current.src = responseData
                    audioRef.current.play()
                }

                
            }
        }
        
        const ChangeCurrentOptions = () =>{
            setCurrentOptions(
                <select className="ILQ_USER_OPTIONS" name={currentILQ.toString()} id={currentILQ.toString()} key={currentILQ} onChange={HandleOptionsSelect}>
                    <Options options={givenDialogoptions} CurrentILQ={currentILQ}/>
                </select>
            )
        }

        const ChangeCurrentAudio = () =>{
            setCurrentAudio(
                <Button className="btn Audio_Dialog_Answer" onClick={()=>{PlayAudio(s3pathsToAudioAnswers[currentILQ])}}>
                    <CiPlay1 size={23} />
                </Button>
            )
        }

        ChangeCurrentOptions()
        ChangeCurrentAudio()

    }, [currentILQ, givenDialogoptions, s3pathsToAudioAnswers])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const newM: MethodArgs = {
            "AId": AId,
            "summary": summary,
            "answer": correctDialogOptions,
            "QPOId": question.qpoId,
        }

        submitAnswer("SubmitILQAAsync", newM)
    }


    return(

        <form onSubmit={handleSubmit}>
            {currentILQ != 5 &&
                <>
                    <audio ref={audioRef} style={{ display: 'none' }} />
                    <div>
                        {dialog}
                    </div>
                    <div>
                        {CurrentAudio}
                    </div>
                    <div>
                        {CurrentOptions}
                    </div>
                </>
            }
            {
                currentILQ == 5 &&

                <>
                    <textarea name="ILQ-summary" id="ILQ-summary" value={summary} onChange={(e)=> setsummary(e.target.value)}></textarea>                
                    <Button>submit</Button>
                </>
            }
        </form>
        
    )
}

export default IlQWindow