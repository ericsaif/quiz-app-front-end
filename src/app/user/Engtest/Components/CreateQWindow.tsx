
import * as QuestionsWindows from "./QuestionsWindows";
import { Question,RACQ, DictationQ, RAQ, DescribePicQ, CTestQ, RSQ, WordExistsQ, DescribePicWAudioQ, LASQ, EssayQ, IRQ, ILQ, InterviewQ } from "../../../../../Models/QuestionsModels";
import { MethodArgs } from "./QuestionsWindows/commonImports";


export function createQuestionWindow(
  question: Question,
  submitAnswer: (SM: string, args: MethodArgs) => Promise<void>,
  TimeOut: boolean
) {
  switch (question.qpoId) {
    case 1: return <QuestionsWindows.CTestWindow question={question as CTestQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 2: return <QuestionsWindows.DictationQWindow question={question as DictationQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 3: return <QuestionsWindows.RAQWindow question={question as RAQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 4: return <QuestionsWindows.DescribePicQWindow question={question as DescribePicQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 5: return <QuestionsWindows.RACQWindow question={question as RACQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 6: return <QuestionsWindows.RSQWindow question={question as RSQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 7: return <QuestionsWindows.WordExistsQWindow question={question as WordExistsQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 8: return <QuestionsWindows.DescribePicWAQWindow question={question as DescribePicWAudioQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 9: return <QuestionsWindows.LASQWindow question={question as LASQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 11: return <QuestionsWindows.EssayQWindow question={question as EssayQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 12: return <QuestionsWindows.IRQWindow question={question as IRQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 13: return <QuestionsWindows.ILQWindow question={question as ILQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    case 14: return <QuestionsWindows.InterviewQWindow question={question as InterviewQ} submitAnswer={submitAnswer} TimeOut={TimeOut}/>;
    default: return null;
  }
}