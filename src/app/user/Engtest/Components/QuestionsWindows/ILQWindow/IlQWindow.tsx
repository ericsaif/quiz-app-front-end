import React, { useEffect, useState, useCallback, useMemo, useRef } from "react"
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
    const [summary, setsummary] = useState<string>("")
    const [correctCount, setcorrectCount] = useState<number>(0)
    const [summaryWindow, setSummaryWindow] = useState<boolean>(false)
    const [contextWindow, setcontextWindow] = useState<boolean>(true)

    const [userSelections, setuserSelections] = useState<{value: number, correct: boolean}[]>([])
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const {s3pathsToAudioAnswers, givenDialogoptions, correctDialogOptions} = question || {}

    // Memoize expensive calculations
    const ScenW = useMemo(() => 
        scenarioWindow({scenario: correctDialogOptions?.scenario ?? '', setcontextWindow: setcontextWindow}), 
        [correctDialogOptions?.scenario]
    );

    const options = useMemo(() => 
        GetOptions({options: givenDialogoptions, currentILQ}), 
        [givenDialogoptions, currentILQ]
    );

    // Reset state when question changes
    useEffect(()=>{
        setsummary("")
        setCurrentILQ(0)
        setuserSelections([])
        setSummaryWindow(false)
        setcontextWindow(true)
        setcorrectCount(0)
    }, [question.id]); // Only depend on question.id, not entire question object

    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [userSelections]);

    // Memoize submit handler
    const handleSubmit = useCallback(() => {
        const newM: MethodArgs = {
            QId: question.id,
            QPOId: question.qpoId,
            summary: summary,
            correctCount,
        }
        submitAnswer("SubmitILQAAsync", newM)
    }, [question.id, question.qpoId, summary, correctCount, submitAnswer]);

    // Handle timeout separately
    useEffect(() => {
        if (TimeOut) {
            handleSubmit();
            console.log("handling Time out = true ");
        }
    }, [TimeOut, handleSubmit]);

    const HandleOptionsSelect = useCallback((value: number) => {

        const correctOption =
            correctDialogOptions?.correctOptionsDialogOptions[currentILQ] !== undefined
                ? (correctDialogOptions.correctOptionsDialogOptions[currentILQ] % 5)
                : 0;
        
        
        if (correctOption == value)
            setcorrectCount(prevcorrectCount => prevcorrectCount+1)

        setuserSelections(prevSelections =>[...(prevSelections || []), {value, correct:correctOption == value }])
        
        
        if(currentILQ < 4)
            setCurrentILQ(currentILQ+1)
        
    }, [correctDialogOptions?.correctOptionsDialogOptions, currentILQ]);

    const CurrentDialog = useMemo(()=>
        userSelections.map(({value, correct}, index)=>{
            const local_options = GetOptions({options: givenDialogoptions, currentILQ: index})
            const correctOption =
            correctDialogOptions?.correctOptionsDialogOptions[index] !== undefined
                ? (correctDialogOptions.correctOptionsDialogOptions[index] % 5)
                : 0;
            return (
            <div key={index}>
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
                                {local_options[value]}
                            </p>
                            {
                                !correct &&
                                <p style={{color: 'red', textDecoration: 'none', whiteSpace: 'pre-wrap'}}>
                                    <b>Best Answer: </b> <br/>
                                    {local_options[correctOption]}
                                </p>
                            }
                        </div>
                    </div>
                </div>
        )})
        
        
    ,[correctDialogOptions?.correctOptionsDialogOptions, givenDialogoptions, userSelections])

    // Memoize current options component
    const CurrentOptions = useMemo(() => (
            <Options 
            newOptions={options} 
            currentILQ={currentILQ.toString()} 
            HandleOptionsSelect={HandleOptionsSelect }
            />
    ), [currentILQ, HandleOptionsSelect, options]);

    // Memoize current audio component
    const CurrentAudio = useMemo(() => (
        <AudioPlayer 
            keyName={`${s3pathsToAudioAnswers?.[currentILQ] || ''}`} 
            maxListenTries={1} 
        />
    ), [s3pathsToAudioAnswers, currentILQ]);

    const renderContent = () => {
        if (contextWindow) {
            return ScenW;
        }

        if (summaryWindow) {
            return (
                <div className="transitionClass row">
                    <div className="vstack">
                        <label htmlFor="ILQ-summary"><h3>Summarize the conversation you just had in 75 seconds</h3></label>
                        <textarea className="ILQ-SUMMARY mx-auto" name="ILQ-summary" id="ILQ-summary" value={summary} onChange={(e)=> setsummary(e.target.value)}></textarea>                
                        <Button className={`submit-btn`} type="submit" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="dialog-container transitionClass">
                    <div ref={scrollContainerRef} className="scrollable-content">
                        {CurrentDialog}
                    </div>
                </div>
                    {
                        currentILQ != 4 &&
                        <div key={`${currentILQ}`} className="AUDIO_AND_SELECT">
                            <div className="SPEAKER_AND_AUDIO">
                                <Image src="/reshot-icon-asian-young-man.svg" width={50} height={50} alt="AsianMan"/>
                                {CurrentAudio}
                            </div>
                            <div className="currentOptionsContent">
                                {CurrentOptions}
                            </div>
                        </div>
                    }
                
                {
                    (currentILQ == 4 && !summaryWindow) &&
                    <Button className={`submit-btn`} type="button" onClick={()=>setSummaryWindow(true)}>Next</Button>
                }
            </>
        );
    };

    return (
        <div className="container-fluid h-100" key={`ILQ_END_WINDOW_FRAGMENT`}>
            {renderContent()}
        </div>
    );
}

export default IlQWindow