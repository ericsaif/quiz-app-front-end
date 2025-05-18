import React, { useEffect, useState, useRef } from "react"
import { ILQ, MethodArgs } from "../commonImports"
import { Button } from "@headlessui/react"
import Options from "./GivenDOptions/Options"

import { CiPlay1 } from "react-icons/ci";
import GetOptions from "./GivenDOptions/getOptions";

import "./ILQWindow.css"
import Image from "next/image";
import AudioPlayer from "../../../../../../../Components/AudioPlayer/AudioPlayer";

const IlQWindow = (props:{question: ILQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{

    const { question, submitAnswer } = props
    const [currentILQ, setCurrentILQ] = useState<number>(0)
    const [AId, setAId] = useState<number[]>([])
    const [summary, setsummary] = useState<string>("")
    const [dialog, setDialog] = useState<React.ReactNode[]>([])
    const [CurrentOptions, setCurrentOptions] = useState<React.ReactNode>()
    const [CurrentAudio, setCurrentAudio] = useState<React.ReactNode>()
    const [summaryWindow, setSummaryWindow] = useState<boolean>(false)
    const [audioLineWidth, setaudioLineWidth] = useState<number>(0)


    const [listenTries, setlistenTries] = useState<number>(0)
    
    const {s3pathsToAudioAnswers, givenDialogoptions, correctDialogOptions} = question

    const audioRef = useRef<HTMLAudioElement>(null)
    const options = GetOptions({options: givenDialogoptions, currentILQ})


    useEffect(()=>{
        
        const HandleOptionsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value
            const valueParsed = parseInt(value,10)

            const correctOption =
                correctDialogOptions?.correctOptionsDialogOptions?.[currentILQ] !== undefined
                    ? correctDialogOptions.correctOptionsDialogOptions[currentILQ] % 5
                    : 0;
            
            let correct = false

            setAId((prevAIds)=>({
                ...(prevAIds || []),
                valueParsed
            }))
            setaudioLineWidth(0)
            
            if (correctOption == valueParsed)
                correct = true
            
            const CurrentDialog = (
                <React.Fragment key={`currentDialog-${currentILQ}`}>
                    <div>
                        <div className="DIALOG_AUDIO_ANSWER">
                            <Image src="/reshot-icon-asian-young-man.svg" width={50} height={50} alt="AsianMan"/>
                            <div className="AUDIO_ANSWER">
                                <CiPlay1 size={23} />
                                <div className="AUDIO_LINE AUDIO_LINE_LISTENED" />
                            </div>
                        </div>
                        <div style={{borderColor: `${correct? "green" : "red"}`}} className="USER_ANSWER">
                            <p style={{ whiteSpace: 'pre-wrap'}} className={`${correct ? "correct-selection" : "incorrect-selection"}`}>
                                {options[valueParsed]}
                            </p>
                            {
                                !correct &&
                                <p style={{color: 'red', textDecoration: 'none', whiteSpace: 'pre-wrap'}}>
                                    <b>Best Answer: </b> <br/>
                                    {options[correctOption]}
                                </p>
                            }
                        </div>
                    </div>
                </React.Fragment>
            )
            setDialog((prevDialog) =>[
                ...(prevDialog || []),
                    CurrentDialog
            ])
            if(currentILQ < 4){
                setlistenTries(0)
                setCurrentILQ(currentILQ+1)
            }
            
        }

        
        const ChangeCurrentOptions = () =>{
            setCurrentOptions(
                <select className="ILQ_USER_SELECT" name={currentILQ.toString()} id={currentILQ.toString()} key={currentILQ} onChange={HandleOptionsSelect}>
                    <Options newOptions={options}/>
                </select>
            )
        }

        const ChangeCurrentAudio = () =>{
            setCurrentAudio(
                <AudioPlayer 
                    keyName={`${s3pathsToAudioAnswers[currentILQ]}`} 
                    maxListenTries={1} 
                />
            )
        }

        ChangeCurrentOptions()
        ChangeCurrentAudio()

    }, [audioLineWidth, correctDialogOptions?.correctOptionsDialogOptions, currentILQ, givenDialogoptions, listenTries, options, s3pathsToAudioAnswers])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const newM: MethodArgs = {
            AId: AId,
            summary: summary,
            answer: correctDialogOptions,
            QPOId: question.qpoId,
        }

        submitAnswer("SubmitILQAAsync", newM)
    }


    return(

        <form className="container-fluid" onSubmit={handleSubmit}>
            {
                !summaryWindow &&
                    <div className="dialog-container transitionClass">
                        <audio ref={audioRef} style={{ display: 'none' }} />
                        <div className="scrollable-content">
                            {dialog}
                        </div>
                        {
                            currentILQ != 4 &&
                            <>
                                <div className="SPEAKER_AND_AUDIO">
                                    <Image src="/reshot-icon-asian-young-man.svg" width={50} height={50} alt="AsianMan"/>
                                    {CurrentAudio}
                                </div>
                                <div className="currentOptionsContent">
                                    {CurrentOptions}
                                </div>
                            </>
                        }
                        
                    </div>
            }
            {
                (currentILQ == 4 && !summaryWindow) &&
                <Button className={`submit-button`} type="button" onClick={()=>setSummaryWindow(true)}>Next</Button>
                
            }
            {
                summaryWindow &&
                <div className="transitionClass row h-100">
                    <div className="vstack">
                        <textarea className="ILQ-SUMMARY mx-auto" name="ILQ-summary" id="ILQ-summary" value={summary} onChange={(e)=> setsummary(e.target.value)}></textarea>                
                        <Button className={`submit-button`} type="submit">submit</Button>
                    </div>
                </div>
            }
        </form>
        
    )
}

export default IlQWindow