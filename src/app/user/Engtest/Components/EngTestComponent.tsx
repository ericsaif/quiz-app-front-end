"use client";

import { ReactElement, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ETWP } from "../../../../../Models/EngTestWindowModels/ETWProps";

import useQuizHubR from "./quizhubR";

import * as QuestionsWindows from "./QuestionsWindows";
import { Question,RACQ, DictationQ, RAQ, DescribePicQ, CTestQ, RSQ, WordExistsQ, DescribePicWAudioQ, LASQ, EssayQ, IRQ, ILQ, InterviewQ } from "../../../../../Models/QuestionsModels";

const EngTestWindow = (props: ETWP) => {
  const [windowContent, setWindow] = useState<ReactElement>();
  const [CurrentQ, SetQ] = useState<Question | null>(null);
  const { startConnection, submitAnswer } = useQuizHubR(props.hubUrl, SetQ);

  useEffect(() => {
    if (CurrentQ === null)
      setWindow(
        <div>
          <Button className="btn btn-primary" onClick={() => startConnection()}>Начать</Button>
        </div>
      );
    else
      switch (CurrentQ.qPOId) {
        case 1:( setWindow(<QuestionsWindows.RACQWindow question={CurrentQ as RACQ } submitAnswer={submitAnswer}/>) );break;
        case 2:( setWindow(<QuestionsWindows.DictationQWindow question={CurrentQ as DictationQ } submitAnswer={submitAnswer}/>) );break;
        case 3:( setWindow(<QuestionsWindows.RAQWindow question={CurrentQ as RAQ } submitAnswer={submitAnswer}/>) );break;
        case 4:( setWindow(<QuestionsWindows.DescribePicQWindow question={CurrentQ as DescribePicQ } submitAnswer={submitAnswer}/>) );break;
        case 5:( setWindow(<QuestionsWindows.CTestWindow question={CurrentQ as CTestQ } submitAnswer={submitAnswer}/>) );break;
        case 6:( setWindow(<QuestionsWindows.RSQWindow question={CurrentQ as RSQ } submitAnswer={submitAnswer}/>) );break;
        case 7:( setWindow(<QuestionsWindows.WordExistsQWindow question={CurrentQ as WordExistsQ } submitAnswer={submitAnswer}/>) );break;
        case 8:( setWindow(<QuestionsWindows.DescribePicWAQWindow question={CurrentQ as DescribePicWAudioQ } submitAnswer={submitAnswer}/>) );break;
        case 9:( setWindow(<QuestionsWindows.LASQWindow question={CurrentQ as LASQ } submitAnswer={submitAnswer}/>) );break;
        case 10:( setWindow(<QuestionsWindows.EssayQWindow question={CurrentQ as EssayQ } submitAnswer={submitAnswer}/>) );break;
        case 11:( setWindow(<QuestionsWindows.IRQWindow question={CurrentQ as IRQ } submitAnswer={submitAnswer}/>) );break;
        case 12:( setWindow(<QuestionsWindows.ILQWindow question={CurrentQ as ILQ } submitAnswer={submitAnswer}/>) );break;
        case 13:( setWindow(<QuestionsWindows.InterviewQWindow question={CurrentQ as InterviewQ } submitAnswer={submitAnswer}/>) );break;
      }
  }, [CurrentQ, submitAnswer, startConnection]);

  return (
    <div>
      {windowContent}
    </div>
  );
};

export default EngTestWindow;
