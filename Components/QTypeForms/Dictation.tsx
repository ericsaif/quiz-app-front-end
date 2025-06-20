"use client"

import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateDictation } from "../Models/CreateQModels/CreateDictationQ/createDictationQ"
import { CreateDictationA } from "../Models/CreateQModels/CreateDictationQ/createDictationA"
import useModal from "../Hooks/useModal"
import { DictationQ } from "../../Models/QuestionsModels"
import { DictationA } from "../../Models/AdminModels/AnswersEntities/dictationA"
import { dict_text } from "./forms_texts/form_texts"


const Dictation = (props:{
    QPOId: number,
    question?: DictationQ
}) =>{
    const { question, QPOId } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question || !question.dictationA))
        throw new Error('Нет необходимых данных, ошибка')

    const [s3PathToAudio, setPathToAudio] = useState<string>(question?.s3PathToAudio || "")
    const [correctText, setCorrectText] = useState<string>(question?.dictationA?.correctText || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    
    let POST_Q: CreateDictation | undefined;
    let PUT_Q: DictationQ | undefined;

    if(!IsEditMode){
        const newDictationA: CreateDictationA ={
            correctText
        }
        const Newquestion: CreateDictation ={
            QPOId,
            s3PathToAudio,
            questionBody: "-",
            createDictationA: newDictationA,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const QAnswer: DictationA ={
            id: question?.dictationA?.id || 0,
            correctText,
            dictationQId: question?.id || 0,
            dictationQ: question || null
        }
        const Question: DictationQ = {
            qpoId: QPOId,
            questionBody: question?.questionBody || '',
            dictationA: QAnswer,
            id: question?.id || 0,
            timer: question?.timer || "",
            s3PathToAudio,
            listenTries: question?.listenTries || 0,
            difficulty
        }
        PUT_Q = Question
    }

    const qtype = "Dictation"

    const modal = useModal({text: dict_text, id: qtype})

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
            !IsEditMode ? POST_Q : undefined,
            qtype,
            IsEditMode ? PUT_Q : undefined,
            IsEditMode ? question?.id : undefined,
        )
    

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        
        if(!IsEditMode){
            setPathToAudio("")
            setCorrectText("")
            setdifficulty('ANY')
        }
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setPathToAudio(value)
    }   
    const HandleAInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setCorrectText(value)
    } 

    return(
        <React.Fragment key={`Dictation-Question-React-Fragment`}>
            <div className="container-fluid align-items-center" style={{height: "100vh"}}>
                <div className="m-2">
                    {modal}
                </div>
                <form className="q-container vstack gap-2 w-50 m-2 align-self-center" onSubmit={HandleFormSubmit}>
                    <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                        <option value="ANY">ANY</option>
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>
                    <label  htmlFor="pathToAudio">Локация:</label>
                    <Input value={s3PathToAudio} required className="w-100" id="pathToAudio" type="text" onChange={HandleInputChange}></Input> 
                    
                    <label htmlFor="dictA">Правильный ответ:</label>
                    <Input value={correctText} required className="w-100" type="text" id="dictA" onChange={HandleAInputChange}></Input>
                    
                    <Button disabled={loading} className={`btn btn-primary`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
                </form>
                <div className="">
                    <p>
                        {error? error : ""}
                        {data?.success? data.message : ""}
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dictation