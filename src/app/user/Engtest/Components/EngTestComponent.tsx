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

  const { startConnection, submitAnswer, TimeOut } = useQuizHubR(hubUrl, SetQ, settimer, engTestId);
  
  const timerRef = useRef<TimerRef>(null);

  const [displaySW, setdisplaySW] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(true);

  const StartingW = React.useMemo(() => (
      <div>
        <Button className="btn btn-primary" onClick={() => {startConnection(); setdisplaySW(false)}}>Начать</Button>
      </div>
  ), [startConnection]);
//

  // const [tempQId, settempQId] = useState<number>(0)
  // const [tempQPOId, settempQPOId] = useState<number>(0)
  // const TempHandleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
  //   e.preventDefault()
  //   const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions/${tempQId}?QPOId=${tempQPOId}`,{
  //     method: 'GET',
  //     credentials: 'include'
  //   })
  //   if(response.ok){
  //     const question: Question = await response.json()
  //     setdisplaySW(false)
  //     settimer("")
  //     settimer(question.timer)
  //     SetQ(question)
  //   }else
  //     alert('ошибка')
  // }
//

  const window = useMemo(() => {
        if (!CurrentQ) return null;
        return createQuestionWindow(CurrentQ, submitAnswer, TimeOut);
  }, [CurrentQ, submitAnswer, TimeOut]);

  useEffect(() => {
    console.log('clearing question window')

    if(TimeOut) timerRef.current?.StopTimer()

    setWindow(null)

    if(displaySW){
      setloading(false)
      return
    }

    if (CurrentQ === null)
      setloading(true)
    else{
      timerRef.current?.StartTimer()

      console.log('setting a new question window')
      setloading(false)
      
      setWindow(window)
    }
  }, [CurrentQ, submitAnswer, displaySW, TimeOut, window]);

  return (
    <React.Fragment key={`react-engTest-window-fragment`}>
      {/* <form className="border border-gray p-3" onSubmit={TempHandleSubmit}>
          <input type="number" placeholder=" " value={tempQId} onChange={(e) => settempQId(parseInt(e.target.value, 10))}></input>
          <input type="number" placeholder=" " value={tempQPOId} onChange={(e) => settempQPOId(parseInt(e.target.value, 10))}></input>
          <button type="submit">get</button>
      </form> */}
      

      {displaySW && StartingW}
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
      {/* <div className={`container-fluid text-center QWindow`}>
            <div className="row d-flex">
              <Timer ref={timerRef} timer={timer} />
            </div>
            <div className="row">
              <button onClick ={()=> {settimer("00:03:00"); console.log("timer is set")}}>set Timer</button>
              <button onClick ={()=>{timerRef.current?.StartTimer(); console.log(`timer - ${timer}`)}}>Start Timer</button>
            </div>
        </div> */}
    </React.Fragment>
  );
};

export default EngTestWindow;
