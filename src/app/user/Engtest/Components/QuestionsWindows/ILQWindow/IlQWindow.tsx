import React, { useEffect, useState } from "react"
import { ILQ, MethodArgs } from "../commonImports"
import { Button } from "@headlessui/react"
import Options from "./GivenDOptions/Options"

import { CiPlay1 } from "react-icons/ci";
import GetOptions from "./GivenDOptions/getOptions";

import "./ILQWindow.css"
import Image from "next/image";
import AudioPlayer from "../../../../../../../Components/AudioPlayer/AudioPlayer";

import scenarioWindow from "./scenarioWindow/scenarioWindow";

const IlQWindow = (props:{question: ILQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{


    const { question, submitAnswer, TimeOut } = props
    
    const [currentILQ, setCurrentILQ] = useState<number>(0)
    const [AId, setAId] = useState<number[]>([])
    const [summary, setsummary] = useState<string>("")
    const [dialog, setDialog] = useState<React.ReactNode[]>([])
    const [CurrentOptions, setCurrentOptions] = useState<React.ReactNode | null>(null)
    const [CurrentAudio, setCurrentAudio] = useState<React.ReactNode | null>(null)
    const [summaryWindow, setSummaryWindow] = useState<boolean>(false)
    const [contextWindow, setcontextWindow] = useState<boolean>(true)

    const [correctCount, setcorrectCount] = useState<number>(0)

    const [audioLineWidth, setaudioLineWidth] = useState<number>(0)


    const [listenTries, setlistenTries] = useState<number>(0)
    
    const {s3pathsToAudioAnswers, givenDialogoptions, correctDialogOptions} = question || {}

    const ScenW = scenarioWindow({scenario: correctDialogOptions?.scenario ?? '', setcontextWindow: setcontextWindow})


    useEffect(()=>{
        setAId([])
        setsummary("")
        setDialog([])
        setCurrentOptions(null)
        setCurrentAudio(null)
        setCurrentILQ(0)
        setlistenTries(0)
        setSummaryWindow(false)
        setcontextWindow(true)
        setcorrectCount(0)
    }, [question])

    const options = GetOptions({options: givenDialogoptions, currentILQ})


    useEffect(()=>{
        
        const HandleOptionsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value
            const valueParsed = parseInt(value,10)

            const correctOption =
                correctDialogOptions?.correctOptionsDialogOptions?.[currentILQ] !== undefined
                    ? (correctDialogOptions.correctOptionsDialogOptions[currentILQ] % 5)
                    : 0;
            
            let correct = false

            setAId((prevAIds) => [...prevAIds, valueParsed])
            
            setaudioLineWidth(0)
            
            if (correctOption == valueParsed){
                correct = true
                setcorrectCount(prevcorrectCount => prevcorrectCount+1)
            }
            
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

    const handleSubmit = () =>{
        const newM: MethodArgs = {
            QId: question.id,
            QPOId: question.qpoId,
            summary: summary,
            correctCount,
        }

        console.log(`AId = ${AId} newM - ${newM}`)

        submitAnswer("SubmitILQAAsync", newM)
    }

    if(TimeOut){
        handleSubmit()
        console.log("handling Time out = true ")
    }

    return(

        <div className="container-fluid" >
            {
                contextWindow && 
                ScenW
            }
            {
                !(summaryWindow || contextWindow) &&
                    <div className="dialog-container transitionClass">
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
                        <label htmlFor="ILQ-summary"><h3>Summarize the conversation you just had in 75 seconds</h3></label>
                        <textarea className="ILQ-SUMMARY mx-auto" name="ILQ-summary" id="ILQ-summary" value={summary} onChange={(e)=> setsummary(e.target.value)}></textarea>                
                        <Button className={`submit-button`} type="submit" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            }
        </div>
        
    )
}

export default IlQWindow