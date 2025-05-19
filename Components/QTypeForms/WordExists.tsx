import React, { useState } from "react"
import { CreateWordExists } from "../Models/CreateQModels/CreateWordExists/createWordExists"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateWEA } from "../Models/CreateQModels/CreateWordExists/createWEA"
import { Button, Input } from "@headlessui/react"
import useModal from "../Hooks/useModal"
import { WordExistsQ } from "../../Models/QuestionsModels"
import { WordExistsA } from "../../Models/AdminModels/AnswersEntities/wordExistsA"

const WordExists = (props:{
    QPOId: number,
    question?: WordExistsQ
}) =>{

    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question || !question.wordExistsA))
        throw new Error('Нет необходимых данных, ошибка')


    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")
    const [exists, setexists] = useState<boolean>(question?.wordExistsA?.exists ?? true)
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    let POST_Q: CreateWordExists | undefined;
    let PUT_Q: WordExistsQ  | undefined;

    if(!IsEditMode){
        const createWEA: CreateWEA ={
            exists
        }
        const Newquestion: CreateWordExists ={
            QPOId,
            questionBody,
            createWEA,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const QAnswer: WordExistsA = {
            id: question?.wordExistsA?.id || 0,
            wordExistsQId: question?.id || 0,
            wordExistsQ: null,
            exists
        }
        const Question: WordExistsQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            wordExistsA: QAnswer,
            difficulty
        }
            
        PUT_Q = Question
    }

    const text: React.ReactNode = (
        <span>

            <p>Введите слово в поле - СЛОВО</p> 
            <p>Далее выберите существует ли данное слово в выпадающем листе - СУЩЕСТВУЕТ ?</p> 
            
        </span>
    )
    
    const qtype = "Word Exists"

    const modal = useModal({text, id: qtype})

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
            setquestionBody("")
            setdifficulty('ANY')
        }

    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   
    const HandleExistsChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        const { value } = event.target
        const bool = parseInt(value, 10) == 1 ? true : false 
        setexists(bool)
    }   

    return(
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>
                <label htmlFor="select-difficulty">Difficulty</label>
                <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                    <option value="ANY">ANY</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>

                <label htmlFor="RAText">СЛОВО:</label>
                <Input value={questionBody} required style={{width: "30%"}} id="RAText" type="text" onChange={HandleInputChange}></Input>  

                <label htmlFor="select-wordexists">СУЩЕСТВУЕТ ?</label>
                <select value={exists ? 1 : 0} style={{width: "30%"}} name="select-wordexists" id="select-wordexists" onChange={HandleExistsChange}>
                    <option value={1}>ДА</option>
                    <option value={0}>НЕТ</option>
                </select>
                      


                <Button disabled={loading} className={`btn btn-primary`} style={{width: "30%"}} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
            </form>
            <div className="">
                <p>
                    {error? error : ""}
                    {data?.success? data.message : ""}
                </p>
            </div>
        </React.Fragment>
    )
}

export default WordExists