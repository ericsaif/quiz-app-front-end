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
    const [s3pathsToAudioAnswers, sets3pathsToAudioAnswers] = useState<string[]>(Array(5).fill('')) 

    const [correctOptions, setCorrectOptions] = useState<number[]>([])
    const [Dialog, setDialog] = useState<string>("")

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
            setDialog(correctDialogOptions.Dialog)
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
            optionsDialogContinuation2: allOptions.slice(11,15),
            optionsDialogContinuation3: allOptions.slice(15,20),
            optionsDialogContinuation4: allOptions.slice(20,25),
        }
        const CorrectDialogOptionsDTO: CorrectDialogOptions_Create ={
            correctOptions,
            Dialog
        }
        const Newquestion: CreateILQ ={
            QPOId,
            s3pathsToAudioAnswers,
            questionBody: "-",
            GivenDialogoptionsDTO,
            CorrectDialogOptionsDTO
        }
        POST_Q = Newquestion
    }else{
        const givenDialogoptions: GivenDialogoptions  ={
            optionsDialogStart: allOptions.slice(0,5),
            optionsDialogContinuation1: allOptions.slice(5,10),
            optionsDialogContinuation2: allOptions.slice(11,15),
            optionsDialogContinuation3: allOptions.slice(15,20),
            optionsDialogContinuation4: allOptions.slice(20,25),
            iLQ: null,
            iLQId: question?.id || 0
        }
        const correctDialogOptions: CorrectDialogOptions = {
            Dialog,
            iLQ: null,
            iLQId: question?.id || 0,
            correctOptionsDialogOptions: correctOptions
        }
        const Question: ILQ = {
            s3pathsToAudioAnswers: [],
            givenDialogoptions,
            correctDialogOptions,
            summaryTimer: question?.summaryTimer || "",
            id: question?.id || 0,
            questionBody: '-',
            qpoId: question?.qpoId || 0,
            timer: question?.timer || ""
        }
        PUT_Q = Question
    }

    const ShowS3PathsInputs = useS3PathsInputs({sets3pathsToAudioAnswers, s3pathsToAudioAnswers})
    const ShowInputs = useInputs({setAlloptions, allOptions})
    const ShowCorrectInputs = useCorrectInputs({setCorrectOptions, correctOptions, Dialog, setDialog})

    const qtype = "Interactive listening"

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
        !IsEditMode ? POST_Q : undefined,
        'CTestQ',
        IsEditMode ? PUT_Q : undefined,
        IsEditMode ? question?.id : undefined,
    )

    const text: React.ReactNode = (
        <>
            <span>
                <p>1. Вставьте локацию аудиофайлов в облачном хранилище - </p>
                <p>Сначала нужно будет сохранить аудиофайл в облачном хранилище </p>
                <p>Далее скопировать его локацию и вставить по порядку в поля </p>

                <p>2. Вставьте возможные ответы - </p>
                <p>Вставляете ответы, которые пользователь можеть дать на вопрос в диалоге </p>

                <p>3. Выберите номера правильных ответов для каждого вопроса </p>
                <p>Выбираете из выпадающего листа - номер правильного ответа </p>

                <p>4. Диалог </p>
                <p>В поле Диалог впишите весь диалог текстом </p>
            </span>
        </>
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
        }
        
    }

    return(
        <React.Fragment key={`react-fragment-ILQ-form`}>
            {modal}
            <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <div className="row my-3 mx-2">
                <div className="col">
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

            <div className="row items-justify-center">
                <div className="col-5 align-self-center">
                    <Button disabled={loading} className={`btn btn-primary`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
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