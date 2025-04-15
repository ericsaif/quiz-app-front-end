"use client";

import { ReactElement, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ETWP } from "../../../../../../Models/EngTestWindowModels/ETWProps";

import useQuizHubR from "./quizhubR";

import * as QuestionsWindows from "./QuestionsWindows";
import { Question,RACQ, DictationQ, RAQ, DescribePicQ, CTestQ, RSQ, WordExistsQ, DescribePicWAudioQ, LASQ, EssayQ, IRQ, ILQ, InterviewQ } from "../../../../../../Models/QuestionsModels";

const EngTestWindow = (props: ETWP) => {
  const [windowContent, setWindow] = useState<ReactElement>();
  const [CurrentQ, SetQ] = useState<Question | null>(null);
  const { startConnection, submitAnswer } = useQuizHubR(props.hubUrl, SetQ);

  useEffect(() => {
    if (CurrentQ === null)
      setWindow(
        <div>
          <p>Press the button below to start your test</p>
          <Button onClick={() => startConnection()}></Button>
        </div>
      );
    else
      switch (CurrentQ.qPOId) {
        case 1:( setWindow(<QuestionsWindows.RACQWindow question={CurrentQ as RACQ }/>) );break;
        case 2:( setWindow(<QuestionsWindows.DictationQWindow question={CurrentQ as DictationQ }/>) );break;
        case 3:( setWindow(<QuestionsWindows.RAQWindow question={CurrentQ as RAQ }/>) );break;
        case 4:( setWindow(<QuestionsWindows.DescribePicQWindow question={CurrentQ as DescribePicQ }/>) );break;
        case 5:( setWindow(<QuestionsWindows.CTestWindow question={CurrentQ as CTestQ }/>) );break;
        case 6:( setWindow(<QuestionsWindows.RSQWindow question={CurrentQ as RSQ }/>) );break;
        case 7:( setWindow(<QuestionsWindows.WordExistsQWindow question={CurrentQ as WordExistsQ }/>) );break;
        case 8:( setWindow(<QuestionsWindows.DescribePicWAQWindow question={CurrentQ as DescribePicWAudioQ }/>) );break;
        case 9:( setWindow(<QuestionsWindows.LASQWindow question={CurrentQ as LASQ }/>) );break;
        case 10:( setWindow(<QuestionsWindows.EssayQWindow question={CurrentQ as EssayQ }/>) );break;
        case 11:( setWindow(<QuestionsWindows.IRQWindow question={CurrentQ as IRQ }/>) );break;
        case 12:( setWindow(<QuestionsWindows.ILQWindow question={CurrentQ as ILQ }/>) );break;
        case 13:( setWindow(<QuestionsWindows.InterviewQWindow question={CurrentQ as InterviewQ }/>) );break;
      }
  }, [CurrentQ, submitAnswer, startConnection]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {windowContent}
            
        </form>
    </div>
  );
};

export default EngTestWindow;
