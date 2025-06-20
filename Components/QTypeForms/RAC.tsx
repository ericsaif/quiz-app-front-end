import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateRAC } from "../Models/CreateQModels/CreateRAC/createRAC"
import { CreateRACA } from "../Models/CreateQModels/CreateRAC/createRACA"
import useModal from "../Hooks/useModal"
import { RACQ } from "../../Models/QuestionsModels"
import { RACA } from "../../Models/AdminModels/AnswersEntities/rACA"
import { RAC_text } from "./forms_texts/form_texts"

const RAC = (props:{
    QPOId: number
    question?: RACQ
}) =>{
    
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question || !question.raca))
        alert('Нет необходимых данных, ошибка')
    
    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")
    const [answer, setanswer] = useState<string>(question?.raca?.answer || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

            
    let POST_Q: CreateRAC | undefined;
    let PUT_Q: RACQ  | undefined;

    if(!IsEditMode){
        const createRACA: CreateRACA ={
            answer
        }
        const Newquestion: CreateRAC ={
            QPOId,
            questionBody,
            CreateRACADTO:createRACA,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const QAnswer: RACA = {
            id: question?.raca?.id || 0,
            rACQId: question?.id || 0,
            rACQ: null,
            answer
        }
        const Question: RACQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            raca: QAnswer,
            difficulty
        }
            
        PUT_Q = Question
    }
    const qtype = "Read And Complete"

    const modal = useModal({text: RAC_text, id: qtype, btn_color: "dark"})

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
            setanswer("")
            setdifficulty('ANY')
        }
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    const HandleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setanswer(value)
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

                <label htmlFor="RACText">ТЕКСТ:</label>
                <textarea value={questionBody} required id="RACText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>    

                <label htmlFor="RACAnswer">ОТВЕТ:</label>
                <Input value={answer} required id="RACAnswer" type="text" onChange={HandleAnswerInputChange}></Input> 
                        

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

export default RAC