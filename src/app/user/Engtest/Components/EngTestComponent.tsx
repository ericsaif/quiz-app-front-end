"use client";

import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
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

const EngTestWindow = (props: ETWP) => {
  const {engTestId, hubUrl} = props

  const [windowContent, setWindow] = useState<ReactElement | null>(null);
  const [CurrentQ, SetQ] = useState<Question | null>(null);
  const [timer, settimer] = useState<string>('');
  const [displaySW, setdisplaySW] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(true);
  const [End_Window, setEnd_Window] = useState<React.ReactNode | null>(null)
  const [explanation, setexplanation] = useState<React.ReactNode | null>(null)

  const { startConnection, submitAnswer, TimeOut } = useQuizHubR(hubUrl, SetQ, settimer, setexplanation, engTestId);
  

  const timerRef = useRef<TimerRef>(null);

  const StartingW = React.useMemo(() => (
      <div>
        <Button className="btn btn-primary" onClick={() => {startConnection(); setdisplaySW(false)}}>Начать</Button>
      </div>
  ), [startConnection]);
// //
//   const [tempQId, settempQId] = useState<number>(0)
//   const [tempQPOId, settempQPOId] = useState<number>(0)
 
//

  const window = useMemo(() => {
        if (!CurrentQ) return null;
        return createQuestionWindow(CurrentQ, submitAnswer, TimeOut);
  }, [CurrentQ, submitAnswer, TimeOut]);

  useEffect(() => {
    console.log('clearing question window')

  //   const TempHandleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
  //   e.preventDefault()
  //   const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions/${tempQId}?QPOId=${tempQPOId}`,{
  //     method: 'GET',
  //     credentials: 'include'
  //   })
  //   if(response.ok){
  //     const question: Question = await response.json()
  //     setdisplaySW(false)
  //     settimer(question.timer)
  //     SetQ(question)
  //   }else
  //     alert('ошибка')
  //  }

    setWindow(null)

    if(TimeOut) timerRef.current?.StopTimer()


    if(displaySW)
      setloading(false)

    if (CurrentQ === null)
      setloading(true)
    else{
      console.log('setting a new question window')
      setloading(false)

      setexplanation(null)
      
      setWindow(window)
    }

    setEnd_Window(
      <React.Fragment key={`react-engTest-window-fragment`}>

        {/* <form className="border border-gray p-3" onSubmit={TempHandleSubmit}>
            <input type="number" placeholder=" " value={tempQId} onChange={(e) => settempQId(parseInt(e.target.value, 10))}></input>
            <input type="number" placeholder=" " value={tempQPOId} onChange={(e) => settempQPOId(parseInt(e.target.value, 10))}></input>
            <button type="submit">get</button>
        </form> */}
        

        {displaySW && StartingW}
        {explanation != null && explanation}
        {loading && <p>Загрузка ... </p>}
        {
          CurrentQ &&
            <div className={`container-fluid text-center QWindow`}>
              <div className="row d-flex">
                <Timer ref={timerRef} timer={timer} />
              </div>
              <div className="row"  style={{height: "100%"}}>
                {windowContent}
              </div>
          </div>
        }
      </React.Fragment>
    )
  }, [CurrentQ, submitAnswer, displaySW, TimeOut, window, StartingW, timer, windowContent, loading, explanation]);

  return End_Window
};

export default EngTestWindow;
