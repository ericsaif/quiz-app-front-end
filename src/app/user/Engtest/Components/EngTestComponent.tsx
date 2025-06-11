"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@mui/material";
import { ETWP } from "../../../../../Models/EngTestWindowModels/ETWProps";

import useQuizHubR from "./quizhubR";
// import { BACKEND_BASE_URL } from "../../../../../constants/api";

import './EngTestW.css'
import './QuestionsWindows/QWindows.css'
import Timer from "../../../../../Components/Timer/Timer";
import { createQuestionWindow } from "./CreateQWindow";
import { Question } from "../../../../../Models/QuestionsModels";
import { TimerRef } from "../../../../../Components/Timer/TimerRef_Props";
import GetExplanations from "./Explanations/Explanations";

const EngTestWindow = (props: ETWP) => {
  const {engTestId, hubUrl} = props

  // const [windowContent, setWindow] = useState<ReactElement | null>(null);
  const [CurrentQ, SetQ] = useState<Question | null>(null);
  const [timer, settimer] = useState<string>('');
  const [displaySW, setdisplaySW] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(true);
  const [explanation, setexplanation] = useState<number | null>(null)

  const { startConnection, submitAnswer, TimeOut, GetAwaitingQuestion } = useQuizHubR(hubUrl, SetQ, settimer, setexplanation, engTestId);
  

  const timerRef = useRef<TimerRef>(null);

  const StartingW = useMemo(() => (
      <div>
        <Button className="btn btn-primary" onClick={() => {startConnection(); setdisplaySW(false)}}>Начать</Button>
      </div>
  ), [startConnection]);

  const window = useMemo(() => {
        if (!CurrentQ) return null;
        return createQuestionWindow(CurrentQ, submitAnswer, TimeOut);
  }, [CurrentQ, submitAnswer, TimeOut]);

  useEffect(() => {
    console.log("setting loading to true")
    setloading(true)

    if(TimeOut) timerRef.current?.StopTimer()

    if (CurrentQ  || displaySW || explanation){
      console.log("setting loading to false")

      setloading(false)
    
    }

  }, [CurrentQ, TimeOut, displaySW, explanation]);

  // // //
    // const [tempQId, settempQId] = useState<number>(0)
    // const [tempQPOId, settempQPOId] = useState<number>(0)
  
  //

  const End_Window = useMemo(()=>{
    // const TempHandleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
    // e.preventDefault()
    // const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions/${tempQId}?QPOId=${tempQPOId}`,{
    //   method: 'GET',
    //   credentials: 'include'
    // })
    // if(response.ok){
    //   const question: Question = await response.json()
    //   setdisplaySW(false)
      
    //   settimer(question.timer)
    //   SetQ(question)
    // }else
    //   alert('ошибка')
    // }
    return(
      <React.Fragment key={`react-engTest-window-fragment`}>

        {/* <form className="border border-gray p-3" onSubmit={TempHandleSubmit}>
            <input type="number" placeholder=" " value={tempQId} onChange={(e) => settempQId(parseInt(e.target.value, 10))}></input>
            <input type="number" placeholder=" " value={tempQPOId} onChange={(e) => settempQPOId(parseInt(e.target.value, 10))}></input>
            <button type="submit">get</button>
        </form> */}
        
          
        <div className={`container-fluid text-center QWindow`}>
          {CurrentQ && 
            <div className="row d-flex">
              <Timer key={`${CurrentQ.id}`} ref={timerRef} timer={timer} />
            </div>
          }{
            (explanation && !CurrentQ ) && 
            <div className="row d-flex">
              <Timer key={`${explanation}`} ref={timerRef} timer={timer} />
            </div>
          }
          
          <div className="row"  style={{height: "100%"}}>
            {(loading && !explanation) && <p>Загрузка ... </p>}
            {displaySW && StartingW}
            {CurrentQ && window}
            {
            (explanation != null && !CurrentQ ) && 
            
              <>
                {GetExplanations(explanation)}
                <Button className="submit-btn" onClick={() => GetAwaitingQuestion()}>Continue</Button>
              </>
            }
          </div>
      </div>
        
      </React.Fragment>
    )
  },[CurrentQ, StartingW, displaySW, explanation, loading, timer, window, GetAwaitingQuestion])

  return End_Window
};

export default EngTestWindow;
