"use client"

import { Button } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import usePOST_Question from "../../Hooks/postQuestion"
import { CreateILQ } from "../../Models/CreateQModels/CreateILQ/createILQ"
import { GivenDialogoptions } from "../../Models/CreateQModels/CreateILQ/givenDialogoptions"
import { CorrectDialogOptions } from "../../Models/CreateQModels/CreateILQ/correctDialogOptions"
import useS3PathsInputs from "./useS3PathsInputs"
import useInputs from "./useInputs"
import useCorrectInputs from "./useCorrectOptions"
import useModal from "../../Hooks/useModal"

const ILQ = (props:{QPOId: number}) =>{
    const [allOptions, setAlloptions] = useState<string[]>(Array(25).fill(''))
    const [s3pathsToAudioAnswers, sets3pathsToAudioAnswers] = useState<string[]>(Array(5).fill('')) 

    const [correctOptions, setCorrectOptions] = useState<number[]>([])
    const [Dialog, setDialog] = useState<string>("")

    useEffect(()=>{
        const setCO = () => {
            setCorrectOptions(Array.from({ length: 5 }, (_, y) => y * 5))
        }
    
        setCO()
    },[])

    const givenDialogoptions: GivenDialogoptions ={
        optionsDialogStart: allOptions.slice(0,5),
        optionsDialogContinuation1: allOptions.slice(5,10),
        optionsDialogContinuation2: allOptions.slice(11,15),
        optionsDialogContinuation3: allOptions.slice(15,20),
        optionsDialogContinuation4: allOptions.slice(20,25),
    }
    const correctDialogOptions: CorrectDialogOptions ={
        correctOptions:correctOptions,
        Dialog
    }
    const newILQ: CreateILQ ={
        QPOId: props.QPOId,
        s3pathsToAudioAnswers: s3pathsToAudioAnswers,
        questionBody: "-",
        GivenDialogoptionsDTO: givenDialogoptions,
        CorrectDialogOptionsDTO: correctDialogOptions
    }

    const ShowS3PathsInputs = useS3PathsInputs({sets3pathsToAudioAnswers, s3pathsToAudioAnswers})
    const ShowInputs = useInputs({setAlloptions, allOptions})
    const ShowCorrectInputs = useCorrectInputs({setCorrectOptions, correctOptions, Dialog, setDialog})

    const qtype = "Interactive listening"

    const { triggerPost, loading, error, data } = usePOST_Question(newILQ, qtype);

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

        setAlloptions(Array(25).fill(''))
        sets3pathsToAudioAnswers(Array(5).fill(''))
        setDialog('')
        for(let y =0; y<5; y++){
            correctOptions[y] = y*5
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

export default ILQ