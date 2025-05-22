"use client"

import { Button } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import usePOST_PUT_Question from "../../Hooks/postQuestion"
import { CreateILQ } from "../../Models/CreateQModels/CreateILQ/createILQ"
import { GivenDialogoptions_Create } from "../../Models/CreateQModels/CreateILQ/givenDialogoptions"
import { CorrectDialogOptions_Create } from "../../Models/CreateQModels/CreateILQ/correctDialogOptions"
import useS3PathsInputs from "./useS3PathsInputs"
import useInputs from "./useInputs"
import useCorrectInputs from "./useCorrectOptions"
import useModal from "../../Hooks/useModal"
import { ILQ } from "../../../Models/QuestionsModels"
import { GivenDialogoptions } from "../../../Models/QuestionsModels/ILQ/givenDialogoptions"
import { CorrectDialogOptions } from "../../../Models/QuestionsModels/ILQ/correctDialogOptions"
import { CSSProperties } from "@mui/material"

import { text } from "./text"

const I_L_Q = (props:{
    QPOId: number,
    question?: ILQ
}) =>{
    const { QPOId, question } = props
    const { correctDialogOptions, givenDialogoptions } = question || {}
   
    const IsEditMode = question ? true : false

    if (IsEditMode && (!givenDialogoptions || !correctDialogOptions)) {
        throw new Error("Необходимых данных не существует");
    }


    const [allOptions, setAlloptions] = useState<string[]>(Array(25).fill(''))
    const [s3pathsToAudioAnswers, sets3pathsToAudioAnswers] = useState<string[]>(question?.s3pathsToAudioAnswers || Array(5).fill('')) 
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    const [correctOptions, setCorrectOptions] = useState<number[]>([])

    const [Dialog, setDialog] = useState<string>(correctDialogOptions?.dialog || "")
    const [scenario, setscenario] = useState<string>(correctDialogOptions?.scenario || "")

    useEffect(()=>{
        const setCO = () => {
            setCorrectOptions(Array.from({ length: 5 }, (_, y) => y * 5))
        }
        const EditMode = () =>{
            if (!question || !givenDialogoptions || !correctDialogOptions) {
                throw new Error("Необходимых данных не существует");
            }
            const arrays = [
                ...givenDialogoptions.optionsDialogStart,
                ...givenDialogoptions.optionsDialogContinuation1,
                ...givenDialogoptions.optionsDialogContinuation2,
                ...givenDialogoptions.optionsDialogContinuation3,
                ...givenDialogoptions.optionsDialogContinuation4,
            ]
            setAlloptions(arrays)
            setCorrectOptions(correctDialogOptions.correctOptionsDialogOptions)
            setDialog(correctDialogOptions?.dialog ?? "")
        }
        if(!IsEditMode)
            setCO()
        else
            EditMode()
    },[IsEditMode, correctDialogOptions, givenDialogoptions, question])
    
    let POST_Q: CreateILQ | undefined;
    let PUT_Q: ILQ | undefined;

    if(!IsEditMode){
        const GivenDialogoptionsDTO: GivenDialogoptions_Create ={
            optionsDialogStart: allOptions.slice(0,5),
            optionsDialogContinuation1: allOptions.slice(5,10),
            optionsDialogContinuation2: allOptions.slice(10,15),
            optionsDialogContinuation3: allOptions.slice(15,20),
            optionsDialogContinuation4: allOptions.slice(20,25),
        }
        const CorrectDialogOptionsDTO: CorrectDialogOptions_Create ={
            correctOptions,
            Dialog, 
            scenario
        }
        const Newquestion: CreateILQ ={
            QPOId,
            s3pathsToAudioAnswers,
            questionBody: "-",
            GivenDialogoptionsDTO,
            CorrectDialogOptionsDTO,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const givenDialogoptions: GivenDialogoptions  ={
            optionsDialogStart: allOptions.slice(0,5),
            optionsDialogContinuation1: allOptions.slice(5,10),
            optionsDialogContinuation2: allOptions.slice(10,15),
            optionsDialogContinuation3: allOptions.slice(15,20),
            optionsDialogContinuation4: allOptions.slice(20,25),
            iLQ: null,
            iLQId: question?.id || 0
        }
        const correctDialogOptions: CorrectDialogOptions = {
            dialog: Dialog,
            iLQId: question?.id || 0,
            scenario,
            correctOptionsDialogOptions: correctOptions
        }
        const Question: ILQ = {
            qpoId: QPOId,
            s3pathsToAudioAnswers,
            givenDialogoptions,
            correctDialogOptions,
            summaryTimer: question?.summaryTimer || "",
            id: question?.id || 0,
            questionBody: '-',
            timer: question?.timer || "",
            difficulty
        }
        PUT_Q = Question
    }

    const ShowS3PathsInputs = useS3PathsInputs({sets3pathsToAudioAnswers, s3pathsToAudioAnswers})
    const ShowInputs = useInputs({setAlloptions, allOptions})
    const ShowCorrectInputs = useCorrectInputs({setCorrectOptions, correctOptions})

    const qtype = "Interactive listening"

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
        !IsEditMode ? POST_Q : undefined,
        qtype,
        IsEditMode ? PUT_Q : undefined,
        IsEditMode ? question?.id : undefined,
    )

    const modal:React.ReactNode = useModal(
        {text, id: qtype}
    )

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()

        if(!IsEditMode){
            setAlloptions(Array(25).fill(''))
            sets3pathsToAudioAnswers(Array(5).fill(''))
            setDialog('')
            for(let y =0; y<5; y++){
                correctOptions[y] = y*5
            }
            setdifficulty('ANY')
        }
        
    }
    const textareaStyle: CSSProperties = {width: "100%", height: "300px"}

    return(
        <React.Fragment key={`react-fragment-ILQ-form`}>
            {modal}
            <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <div className="row my-3 mx-2">
                <div className="col">
                    <label htmlFor="select-difficulty">Difficulty: </label>
                    <br/> 
                    <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                        <option value="ANY">ANY</option>
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>
                    <br/>
                    <label className="border border-dark p-1" htmlFor="S3PathsInputs">Вставьте локацию аудио файлов в облачном хранилище: </label> <br/>
                    <div className="vstack" id="S3PathsInputs">
                        {ShowS3PathsInputs}
                    </div>     
                    <div className="mt-3">
                        <label className="border border-dark p-1" htmlFor="CorrectInputs">Выберите номера правильных ответов для каждого вопроса</label><br/>
                        <div id="CorrectInputs">
                            {ShowCorrectInputs}
                        </div> 
                    </div>
                </div>   

                <div className="col">
                    <label className="border border-dark p-1" htmlFor="Inputs">Вставьте возможные ответы: </label> <br/>
                    <div className="vstack" id="Inputs">
                        {ShowInputs}
                    </div>     
                </div>       
            </div>     

            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 vstack mt-3">
                            <label htmlFor="ILQ-Dialog">Диалог</label>
                            <textarea placeholder="correct-dailog" value={Dialog ?? ''} style={textareaStyle} name="ILQ-Dialog" id="ILQ-Dialog" onChange={(e) =>setDialog(e.target.value)}/>
                        </div>
                        <div className="col-6 vstack mt-3">
                            <label htmlFor="ILQ-scenario">Сценарий / Контекст</label>
                            <textarea placeholder="correct-dailog" value={scenario ?? ''} style={textareaStyle} name="ILQ-scenario" id="ILQ-scenario" onChange={(e) =>setscenario(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row items-justify-center">
                <div className="col-5 align-self-center">
                    <Button disabled={loading} className={`btn btn-primary mt-3`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
                </div>    
            </div>                
            <div className="row">
                <p>
                    {error? error : ""}
                    {data?.success? data.message : ""}
                </p>
            </div>

            </form>
        </React.Fragment>
    )
}

export default I_L_Q