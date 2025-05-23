"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ETWP } from "../../../../../Models/EngTestWindowModels/ETWProps";

import useQuizHubR from "./quizhubR";

import * as QuestionsWindows from "./QuestionsWindows";
import { Question,RACQ, DictationQ, RAQ, DescribePicQ, CTestQ, RSQ, WordExistsQ, DescribePicWAudioQ, LASQ, EssayQ, IRQ, ILQ, InterviewQ } from "../../../../../Models/QuestionsModels";
import { BACKEND_BASE_URL } from "../../../../../constants/api";

import './EngTestW.css'
import './QuestionsWindows/QWindows.css'
import Timer from "../../../../../Components/Timer/Timer";

const EngTestWindow = (props: ETWP) => {
  const {engTestId, hubUrl} = props

  const [windowContent, setWindow] = useState<ReactElement | null>(null);
  const [CurrentQ, SetQ] = useState<Question | null>(null);
  const [timer, settimer] = useState<string>('');

  const { startConnection, submitAnswer, TimeOut } = useQuizHubR(hubUrl, SetQ, settimer, engTestId);

  const [displaySW, setdisplaySW] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(true);



  const StartingW = React.useMemo(() => (
      <div>
        <Button className="btn btn-primary" onClick={() => {startConnection(); setdisplaySW(false)}}>Начать</Button>
      </div>
  ), [startConnection]);
//

  const [tempQId, settempQId] = useState<number>(0)
  const [tempQPOId, settempQPOId] = useState<number>(0)
  const TempHandleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions/${tempQId}?QPOId=${tempQPOId}`,{
      method: 'GET',
      credentials: 'include'
    })
    if(response.ok){
      const question: Question = await response.json()
      setdisplaySW(false)
      SetQ(question)
    }else
      alert('ошибка')
  }
//
  useEffect(() => {
    console.log('clearing question window')

    setWindow(null)
    if(displaySW){
      setloading(false)
      return
    }
    if (CurrentQ === null)
      setloading(true)
    else{
      console.log('setting a new question window')
      setloading(false)
      switch (CurrentQ.qpoId) {
        case 1:( setWindow(<QuestionsWindows.CTestWindow question={CurrentQ as CTestQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 2:( setWindow(<QuestionsWindows.DictationQWindow question={CurrentQ as DictationQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 3:( setWindow(<QuestionsWindows.RAQWindow question={CurrentQ as RAQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 4:( setWindow(<QuestionsWindows.DescribePicQWindow question={CurrentQ as DescribePicQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 5:( setWindow(<QuestionsWindows.RACQWindow question={CurrentQ as RACQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 6:( setWindow(<QuestionsWindows.RSQWindow question={CurrentQ as RSQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 7:( setWindow(<QuestionsWindows.WordExistsQWindow question={CurrentQ as WordExistsQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 8:( setWindow(<QuestionsWindows.DescribePicWAQWindow question={CurrentQ as DescribePicWAudioQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 9:( setWindow(<QuestionsWindows.LASQWindow question={CurrentQ as LASQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 11:( setWindow(<QuestionsWindows.EssayQWindow question={CurrentQ as EssayQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 12:( setWindow(<QuestionsWindows.IRQWindow question={CurrentQ as IRQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 13:( setWindow(<QuestionsWindows.ILQWindow question={CurrentQ as ILQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
        case 14:( setWindow(<QuestionsWindows.InterviewQWindow question={CurrentQ as InterviewQ } submitAnswer={submitAnswer} TimeOut={TimeOut}/>) );break;
      }
    }
  }, [CurrentQ, submitAnswer, displaySW, TimeOut]);

  return (
    <React.Fragment key={`react-engTest-window-fragment`}>
      <form className="border border-gray p-3" onSubmit={TempHandleSubmit}>
          <input type="number" placeholder=" " value={tempQId} onChange={(e) => settempQId(parseInt(e.target.value, 10))}></input>
          <input type="number" placeholder=" " value={tempQPOId} onChange={(e) => settempQPOId(parseInt(e.target.value, 10))}></input>
          <button type="submit">get</button>
      </form>
      {displaySW && StartingW}
      {loading && <p>Загрузка ... </p>}
      {
        CurrentQ &&
          <div className={`container-fluid text-center QWindow`}>
            <div className="row">
              <Timer 
                timer={timer}
                TimeOut={TimeOut}
              />
            </div>
            <div className="row"  style={{height: "100%"}}>
              {windowContent}
            </div>
        </div>
      }
    </React.Fragment>
  );
};

export default EngTestWindow;
